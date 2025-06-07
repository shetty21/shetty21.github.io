# build_kb.py
import chromadb
from sentence_transformers import SentenceTransformer
import re

chroma_client = chromadb.PersistentClient(path="./chroma_db")

with open("knowledge_base.txt", "r", encoding="utf-8") as f:
    all_text = f.read()

# Split by common section headings (customize as needed)
sections = re.split(r'\n(?=[A-Z][a-z]+:)', all_text)
chunks = []
for section in sections:
    if len(section) > 1000:
        # Further split large sections
        sub_chunks = [section[i:i+1000] for i in range(0, len(section), 1000)]
        chunks.extend(sub_chunks)
    else:
        chunks.append(section)

model = SentenceTransformer("all-mpnet-base-v2")

batch_size = 100
embeddings = []
for i in range(0, len(chunks), batch_size):
    batch_chunks = chunks[i : i + batch_size]
    batch_embeddings = model.encode(batch_chunks, normalize_embeddings=True)
    embeddings.extend(batch_embeddings)

# Reset collection
try:
    existing_collections = [c.name for c in chroma_client.list_collections()]
    if "pdf_chunks" in existing_collections:
        chroma_client.delete_collection("pdf_chunks")
except Exception as e:
    print(f"Warning: Could not delete existing collection: {e}")

collection = chroma_client.create_collection("pdf_chunks")

for i, chunk in enumerate(chunks):
    metadata = {"chunk_index": i}
    collection.add(
        documents=[chunk],
        embeddings=[embeddings[i]],
        ids=[str(i)],
        metadatas=[metadata],
    )

print(f"Added {len(chunks)} chunks to ChromaDB.")

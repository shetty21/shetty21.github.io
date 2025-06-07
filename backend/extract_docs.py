# extract_docs.py
from kreuzberg import extract_file
import asyncio
import os

file_dir = "../public/assets/my_documents_extractor"
valid_exts = ('.pdf', '.ppt', '.pptx', '.docx')

def find_files_recursive(directory, extensions):
    file_list = []
    for root, _, files in os.walk(directory):
        for f in files:
            if f.lower().endswith(extensions):
                file_list.append(os.path.join(root, f))
    return file_list

file_list = find_files_recursive(file_dir, valid_exts)

async def extract_single_file(file_path):
    try:
        result = await extract_file(file_path)
        return f"\n---\n{os.path.basename(file_path)}\n{result.content}\n"
    except Exception as e:
        print(f"Failed to extract {file_path}: {e}")
        return ""

async def extract_all_files(file_list):
    tasks = [extract_single_file(f) for f in file_list]
    results = await asyncio.gather(*tasks)
    return "".join(results)

all_text = asyncio.run(extract_all_files(file_list))

with open("knowledge_base.txt", "w", encoding="utf-8") as f:
    f.write(all_text)

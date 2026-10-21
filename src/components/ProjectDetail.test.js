import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectDetail from "./ProjectDetail";
import { projectsData } from "./projectsData";

let mockSlug = "glp1-research-landscape-tableau";
jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: mockSlug }),
  useNavigate: () => jest.fn()
}), { virtual: true });

test("features the Tableau project with a live dashboard link", () => {
  render(<ProjectDetail />);
  const link = screen.getByRole("link", { name: /View interactive Tableau dashboard/ });
  expect(link).toHaveAttribute("href", projectsData[0].dashboardUrl);
  expect(link).toHaveAttribute("target", "_blank");
  expect(screen.getByText(/1,953 clinical-trial/)).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("src", expect.stringContaining("glp1-research-landscape.svg"));
  expect(screen.queryByRole("link", { name: /GitHub/ })).not.toBeInTheDocument();
});

test("preserves existing GitHub case study links", () => {
  mockSlug = "dannys-diner-sql-case-study";
  render(<ProjectDetail />);
  expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", expect.stringContaining("01-dannys-diner"));
  expect(screen.queryByRole("link", { name: /interactive Tableau/ })).not.toBeInTheDocument();
});

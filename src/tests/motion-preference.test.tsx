import { act, fireEvent, render, screen } from "@testing-library/react";
import { useReducedMotion } from "@/lib/motion/reduced-motion";

function Preference({ name }: { name: string }) {
  const [reduced, toggle] = useReducedMotion();
  return (
    <button onClick={toggle} aria-pressed={reduced}>
      {name}
    </button>
  );
}

test("a motion change reaches every consumer and writes the preference", () => {
  let saved: string | null = null;
  jest.mocked(localStorage.getItem).mockImplementation(() => saved);
  jest.mocked(localStorage.setItem).mockImplementation((_key, value) => {
    saved = value;
  });
  render(
    <>
      <Preference name="Header preference" />
      <Preference name="Footer preference" />
    </>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Header preference" }));
  expect(
    screen.getByRole("button", { name: "Header preference" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByRole("button", { name: "Footer preference" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "billora-marketing:reduced-motion",
    "true",
  );
  fireEvent.click(screen.getByRole("button", { name: "Footer preference" }));
  expect(
    screen.getByRole("button", { name: "Header preference" }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("a preference change from another tab updates the current page", () => {
  let saved: string | null = null;
  jest.mocked(localStorage.getItem).mockImplementation(() => saved);
  render(<Preference name="Motion" />);
  act(() => {
    saved = "true";
    window.dispatchEvent(new Event("storage"));
  });
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("motion still toggles when storage is unavailable", () => {
  jest.mocked(localStorage.getItem).mockImplementation(() => {
    throw new Error("Unavailable");
  });
  jest.mocked(localStorage.setItem).mockImplementation(() => {
    throw new Error("Unavailable");
  });
  render(<Preference name="Motion" />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
});

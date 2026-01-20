import { readFile } from "fs/promises";
import path from "path";
import ComponentShowcaseClient from "./ComponentShowcaseClient";

type Props = {
  sourcePath: string;
  children: React.ReactNode;
};

export default async function ComponentShowcase({ sourcePath, children }: Props) {
  let source = "";
  try {
    const fullPath = path.join(process.cwd(), "app", "components", `${sourcePath}.tsx`);
    source = await readFile(fullPath, "utf-8");
  } catch {
    source = `// Could not load app/components/${sourcePath}.tsx`;
  }
  return (
    <ComponentShowcaseClient source={source} sourcePath={sourcePath}>
      {children}
    </ComponentShowcaseClient>
  );
}

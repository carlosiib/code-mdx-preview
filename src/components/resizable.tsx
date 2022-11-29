import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

export const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
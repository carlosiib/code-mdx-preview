import { useTypeSelector } from "../hooks/use-typed-selector"

const CellList: React.FC = () => {
  useTypeSelector((state) => state)
  return <div>cell list</div>
}

export default CellList
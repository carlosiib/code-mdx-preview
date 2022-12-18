import { Fragment } from 'react'
import { useTypeSelector } from "../hooks/use-typed-selector"
import CellListItem from "./cell-list-item"
import AddCell from "./add-cell"

const CellList: React.FC = () => {
  // Getting store values
  const cells = useTypeSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id]
    })
  })

  const renderCELLS = cells.map(cell =>
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  )
  return <div>
    {renderCELLS}
    <AddCell nextCellId={null} />
  </div>
}

export default CellList
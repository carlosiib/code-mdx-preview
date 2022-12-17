import { useActions } from "../hooks/useActions"

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  // action-creators
  const { moveCell, deleteCell } = useActions()

  return (
    <div>
      <button onClick={() => moveCell(id, 'up')}>UP</button>
      <button onClick={() => moveCell(id, 'down')}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </div>
  )
}

export default ActionBar
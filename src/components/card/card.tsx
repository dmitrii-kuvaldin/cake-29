
import { useDispatch } from 'react-redux'
import { delTodo, editTodo } from '../../store/todos/todos.action'
import { AppDispatch } from '../../store/store';
import { useRef, useState } from 'react';

interface CardProps {
  name: string;
  id: number;
}

export default function Card({ name, id }: CardProps) {
  const dispatch = useDispatch<AppDispatch>()

  const inputRef = useRef<HTMLInputElement | null>(null);


  const [editedName, setEditedName] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      // Dispatch editTodo action when done editing
      dispatch(editTodo({ id, updatedTodo: { name: editedName } }));
    }
    setIsEditing(!isEditing);
  };

  // const handleInputDoubleClick = () => {
  //   if (inputRef.current) {
  //     inputRef.current.select();
  //   }
  // };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleEdit}>
            <div className="mb-3">
              {isEditing ? (

                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                // onClick={handleInputDoubleClick}
                />

              ) : (
                <h5 className="card-title">{name}</h5>
              )}
            </div>
            <button onClick={() => dispatch(delTodo(id))} type="button" className="btn btn-danger">Del</button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

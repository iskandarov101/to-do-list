import './main.scss';
const Group = ({children})=> {

  return(
    <ul className="list-group mt-3">
      {children}
    </ul>
  )
}

export default Group;
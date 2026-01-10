const Header = (props) => {
  return (
    <header>
      {props.text}
      <p>{props.title}</p>
    </header>
  )
}

export default Header

const Header = ({ text: myText, title = "ЗАГОЛОВОК" }) => {
  return (
    <header className="header">
      {myText}
      <p>{title}</p>
    </header>
  )
}

export default Header

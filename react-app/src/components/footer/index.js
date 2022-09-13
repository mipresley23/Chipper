import copyright from '../assets/copyrightsymbol.png'

export default function Footer() {
  return(
    <>
      <div id='footer-container'>
        <div id="footer-links">
          <p>Javascript</p>
          <p>React</p>
          <p>Redux</p>
          <p>Python</p>
          <p>Flask</p>
          <p>SQLAlchemy</p>
          <p>PostgreSQL</p>
        </div>
        <div id="footer-copyright">
          <img  id='copyright-symbol' src={copyright} alt='copyright'/>
          <p>Michael Presley, 2022</p>
        </div>
      </div>
    </>
  )
}

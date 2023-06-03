export default function Images(props) {
  return (
    <section className={props.name}>
      <img src={props.url} className='image'></img>
      <a href="#" className="download" download id={props.BtnId}>Baixar Imagem</a>
    </section>
  )
}
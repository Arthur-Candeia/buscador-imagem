import { React, useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Spinner } from 'reactstrap';
import { FetchUrl } from './api/Fetch';

export default function App() {
  const [imageUrl, setImageUrl] = useState('./background.png')
  let scale = '1280x720'

  function imageRender(ev) {
    ev.preventDefault()
    setImageUrl('./background.png')

    const search = document.getElementById('search')
    const image = document.getElementById('image')
    const loading = document.querySelector('.loading')
    const btnDownload = document.getElementById('download')

    loading.style.display = 'block'
    image.style.boxShadow = '3px 3px 10px rgba(0, 0, 0, 0.308)'
    imageResize()

    FetchUrl(scale, search.value).then((result) => {
      setImageUrl(result.url)
      return result.blob()
    }).then((result) => btnDownload.setAttribute('href', `${URL.createObjectURL(result)}`))
    
    search.value = ''
    setTimeout(() => {
      loading.style.display = 'none'
      btnDownload.style.display = 'block'
    }, 2000)
    
  }

  function imageResize() {
    const image = document.getElementById('image')
    const mode = document.querySelector('input[type="radio"]:checked').value
    switch (mode) {
      case 'L':
        scale = '1280x720'
        if (window.innerWidth <= 800) {
          image.style.width = `95vw`
          image.style.height = `40vw`
        }
        else {
          image.style.width = `55vw`
          image.style.height = `25vw`
        }
      break
      case 'P':
        scale = '720x1280'
        if (window.innerWidth <= 800) {
          image.style.width = '40vw'
          image.style.height = '55vw'
        }
        else {
          image.style.width = '25vw'
          image.style.height = `${55 / 1.7}vw`
        }
      break
    }
  }
    
  window.addEventListener('resize', () => imageResize())

  return (
    <div id='app'>
      <h1>Buscador de imagens</h1>
      <span id='subtittle'>Pesquise algo para encontrar uma imagem!</span>

      <form id='form' onSubmit={imageRender} autoComplete='off'>
        <div className="searchItems">
          <input type="search" name="search" id="search" placeholder='Ex: casa, comida, videogame, etc.' required
          />
          <button type='submit'><BsSearch /></button>

          <Spinner className='loading' />
        </div>
        <span className='info'>Buscas em inglês alcançam resultados mais satisfatórios</span>

        <div className="options">
          <span>
            <input type="radio" name="view" id="portrait" value="P"/>
            <label htmlFor="portrait">Retrato</label>
          </span>
          <span>
            <input type="radio" name="view" id="landscape" value="L" defaultChecked/>
            <label htmlFor="landscape">Paisagem</label>
          </span>
        </div>
      </form>

      <img src={imageUrl} id='image'></img>
      <a href="#" id="download" download>Baixar Imagem</a>
    </div>
  )
}
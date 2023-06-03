import { React, useEffect, useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Spinner } from 'reactstrap';
import { FetchUrl } from './api/Fetch';
import Images from './components/Images';
let scale = '1280x720'

export default function App() {
  const [imageUrl1, setImageUrl1] = useState('./background.png')
  const [imageUrl2, setImageUrl2] = useState('./background.png')
  const [imageUrl3, setImageUrl3] = useState('./background.png')
  
  function imageRender(ev) {
    ev.preventDefault()
    setImageUrl1('./background.png')
    setImageUrl2('./background.png')
    setImageUrl3('./background.png')

    const search = document.getElementById('search')
    const mode = document.querySelector('input[type="radio"]:checked').value
    const image = document.querySelectorAll('.image')
    const loading = document.querySelector('.loading')
    const btnDownload = document.querySelectorAll('.download')
    const btn1 = document.getElementById('btn1')
    const btn2 = document.getElementById('btn2')
    const btn3 = document.getElementById('btn3')

    loading.style.display = 'block'
    btnDownload.forEach((element) => element.style.display = 'none')

    image.forEach((element) => {
      element.style.display = 'block'
      element.style.boxShadow = '3px 3px 10px rgba(0, 0, 0, 0.308)'
      imageResize(element, mode)
    })

    FetchUrl(scale, search.value).then(async ({result1, result2, result3}) => {
      setImageUrl1(result1.url)
      setImageUrl2(result2.url)
      setImageUrl3(result3.url)
      let img1 = await result1.blob()
      let img2 = await result2.blob()
      let img3 = await result3.blob()
      return {img1, img2, img3}
    }).then((result) => {
      btn1.setAttribute('href', `${URL.createObjectURL(result.img1)}`)
      btn2.setAttribute('href', `${URL.createObjectURL(result.img2)}`)
      btn3.setAttribute('href', `${URL.createObjectURL(result.img3)}`)
      loading.style.display = 'none'
      btnDownload.forEach((element) => element.style.display = 'block')
    })
  }

  function imageResize(image, mode) {
    const container = document.querySelector('.container')
    container.style.flexDirection = 'column'
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
          container.style.flexDirection = 'row'
          container.style.gap = '20px'
          image.style.width = '25vw'
          image.style.height = `${55 / 1.7}vw`
        }
      break
    }
  }

  window.addEventListener('resize', () => {
    const image = document.querySelectorAll('.image')
    let mode = ''
    scale == '1280x720' ? mode = 'L' : mode = 'P'
    image.forEach((element) => {
      imageResize(element, mode)
    })
  })

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

      <div className="container">
        <Images url={imageUrl1} name={'section1'} BtnId={'btn1'} />
        <Images url={imageUrl2} name={'section2'} BtnId={'btn2'} />
        <Images url={imageUrl3} name={'section3'} BtnId={'btn3'} />
      </div>
    </div>
  )
}
import {CATEGORY_CDN} from "../constants/constants";

export const categoryImage = (id: number) : string  => {
  let image = ""
  if (id === 1)
    image = `${CATEGORY_CDN}/Hidratante.png`
  else if (id === 2)
    image = `${CATEGORY_CDN}/Limpiador.png`
  else if (id === 3)
    image = `${CATEGORY_CDN}/Tonico.png`
  else if (id === 4)
    image = `${CATEGORY_CDN}/Mascarilla.png`
  else if (id === 6)
    image = `${CATEGORY_CDN}/Serum.png`
  else if (id === 7)
    image = `${CATEGORY_CDN}/Exfoliante.png`
  else if (id === 8)
    image = `${CATEGORY_CDN}/Ojas.png`
  else if (id === 9)
    image = `${CATEGORY_CDN}/Desmaquillante.png`
  else if (id === 10)
    image = `${CATEGORY_CDN}/Brumas.png`
  else if (id === 11)
    image = `${CATEGORY_CDN}/Protector solar.png`
  else if (id === 12)
    image = `${CATEGORY_CDN}/Labios.png`
  else if (id === 13)
    image = `${CATEGORY_CDN}/Aceites.png`
  else if (id === 15)
    image = `${CATEGORY_CDN}/Barba.png`
  else if (id === 16)
    image = `${CATEGORY_CDN}/Tratamiento.png`
  else if (id === 17)
    image = `${CATEGORY_CDN}/Accesorios.png`
  return image
}
import { useState, useEffect } from 'react'
import BtnNavBar from '../../components/Button/BtnNavBar'
import Card from '../../components/Card/Card'
import Head from 'next/head'
import Image from 'next/image'
import Mercaef from '../../public/Logo.png'
import NavBar from '../../components/NavBar/NavBar'
import Styles from './HomePage.module.css'

export default function HomePage() {
    const [isActive, setIsActive] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/api/Productos')
            .then(res => res.json())
            .then(data => {
                setProducts(data.Productos);
            })
    }, [])

    const handleClick = () => {
        isActive === true ? setIsActive(false) : setIsActive(true)
    }

    return (
        <>
            <Head>
                <title>Mercaef | Home</title>
                <link rel="icon" href="Logo.png" />
            </Head>
            <div className={Styles.main}>
                <div className={Styles.container}>
                    <NavBar handleClick={handleClick} />
                    <section className={Styles.navRight}>
                        {
                            isActive === true
                                ?
                                <div className={Styles.btnsNavBar}>
                                    <Image src={Mercaef} alt="Avatar" width={80} height={80} />
                                    <BtnNavBar icon="true" text="Home" />
                                    <BtnNavBar icon="true" text="Lista" />
                                    <BtnNavBar icon="true" text="Ruta" />
                                    <BtnNavBar icon="true" text="Config" />
                                </div>
                                :
                                <>
                                    <div className={Styles.divAvatar}>
                                        <Image src={Mercaef} alt="Avatar" width={80} height={80} />
                                        <h3>Jorge Esteban Areiza Castrillon</h3>
                                    </div>
                                    <div className={Styles.btnsNavBar}>
                                        <BtnNavBar text="Home" />
                                        <BtnNavBar text="Lista" />
                                        <BtnNavBar text="Ruta" />
                                        <BtnNavBar text="Config" />
                                    </div>
                                </>
                        }
                    </section>
                    <section className={Styles.cards}>
                        {
                            products.map(({ id, Name, Price, img }) =>
                                <Card key={id} name={Name} price={Price} img={img} />
                            )
                        }

                    </section>
                </div>
            </div>
        </>
    )
}
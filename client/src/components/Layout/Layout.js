import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (porps) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '73vh' }}>{porps.children}</main>
            <Footer />
        </div>
    )
}

export default Layout
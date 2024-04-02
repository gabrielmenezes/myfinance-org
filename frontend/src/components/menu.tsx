import Link from 'next/link'
import React from 'react'

type Props = {}

const Menu = (props: Props) => {
    return (
        <div className="md:w-1/3 flex w-full">
            <ul className="list-none mx-4 py-8 px-2 flex flex-row space-x-2 md:flex-col">
                <Link href={"/dashboard/"}>Resumo</Link>
                <Link href={"/dashboard/orcamento"}>Orçamento</Link>
                <Link href={"/dashboard/investimentos"}>Investimentos</Link>
                <Link href={"/dashboard/planejamento"}>Planejamento</Link>
                <Link href={"/dashboard/cartao"}>Cartões</Link>
                <Link href={"/dashboard/dividas"}>Dívidas</Link>
            </ul>
        </div>
    )
}

export default Menu
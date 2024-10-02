interface HeaderProps { 
    text: string
}

const Header = ({ text }: HeaderProps) => {
  return (
    <h1 className="scroll-m-20 t3xt-3xl font-semibold tracking-tight lg:text-4xl">
        {text}
    </h1>
  )
}

export default Header
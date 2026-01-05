"use server"

import Header from "@/components/header"
import MainDataComponent from "@/components/mainDataComponent"

const LayoutComponent = async() => {
  return (
    <div className="mx-auto container max-w-5xl  border-r border-l border-border min-h-screen">
        <Header/>
        <MainDataComponent/>
    </div>
  )
}

export default LayoutComponent
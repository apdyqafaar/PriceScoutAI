import LinksComponent from "../linksComponent"
import ProgressDataComponent from "../progressData"


const DataComponent = ({data}:{data:any}) => {
  return (
    <div className="grid grid-cols-3 gap-3">
        <div className=" col-span-2">
            <LinksComponent data={data}/>
        </div>
        <div className="border-l border-border pl-3">
            <ProgressDataComponent data={data}/>
        </div>
    </div>
  )
}

export default DataComponent
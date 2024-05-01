import CVForm from "./CVForm"
import CVTable from "./CVTable"

export default function CVPage() {
    return (<>
        <div className="page_section">
          <CVForm />
            
          <CVTable />  
        </div>
        
    </>
    )
}

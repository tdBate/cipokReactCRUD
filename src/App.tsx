import { useEffect, useState } from "react"
import type { Cipo } from "./models"

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("http://localhost:3000/cipok/")
        const data = await response.json() as Cipo[];
        setCipok(data);
      } catch (err) {
        console.error("Err: " + err.message);
      }
    }

    loadData();
  }, [])

  return (<>
    <h2>Cipok lista</h2>
    <div className="container">
      <div className="row">
        {cipok.map(item => (
          <>
            <div className="card col-sm-6" key={item.id}>
              <div className="card-title">
                <h3>{item.nev}</h3>
              </div>
              <div className="card-body">
                <p>Ár: {item.ar} Ft</p>
                <p>Raktáron: {item.raktaron ? "igen" : "nem"}</p>
                <p>Kiadás dátuma: {item.kiadasDatuma}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  </>)
}

export default App

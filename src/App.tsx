import { useEffect, useState } from "react"
import type { Cipo } from "./models"

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);

  //form useffect
  const [nev, setNev] = useState("");
  const [ar, setAr] = useState(0);
  const [raktaron, setRaktaron] = useState(true);
  const [datum, setDatum] = useState(new Date());

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

  async function handlePost(e) {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    const formData = new FormData(form);

    const cipo: Cipo = {
      nev: nev,
      ar: ar,
      raktaron: raktaron,
      kiadasDatuma: datum.toLocaleDateString("sv-SE")
    }

    const response = await fetch("http://localhost:3000/cipok", {
      "method": "POST",
      headers: { "Content-type": "appplication/json" },
      body: JSON.stringify(cipo)
    });

    const resCipo: Cipo = await response.json();
    setCipok((elozo) => [...elozo, resCipo])

    setNev("");
    setAr(0);
    setRaktaron(false);
    setDatum(new Date());

  }

  return (<>
    <h1 className="text-center">Cipő</h1>
    <div className="container">
      <div className="row g-3">
        <div className="col-sm-12 mb-3">
          <form onSubmit={handlePost}>
            <label className="form-label" htmlFor="nev">Név</label>
            <input className="form-control" value={nev} onChange={(e) => setNev(e.target.value)} name="nev" type="text" /><br />

            <label className="form-label" htmlFor="ar">Ár</label>
            <input className="form-control" value={ar} onChange={(e) => setAr(parseInt(e.target.value))} name="ar" type="number" /><br />

            <label className="form-label" htmlFor="raktaron">Raktáron</label>
            <input className="form-check-input" value={raktaron ? 0 : 1} onChange={(e) => setRaktaron(e.target.value == "checked" ? true : false)} name="raktaron" type="checkbox" /><br />

            <label className="form-label" htmlFor="date">Dátum</label>
            <input className="form-control" value={datum.toLocaleDateString("sv-SE")} onChange={(e) => setDatum(new Date(e.target.value))} name="date" type="date" /><br />

            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>

        {cipok.map(item => (
          <>
            <div key={item.id} className="col-sm-4">
              <div className="card">
                <div className="card-title">
                  <h3>{item.nev}</h3>
                </div>
                <div className="card-body">
                  <p>Ár: {item.ar} Ft</p>
                  <p>Raktáron: {item.raktaron ? "igen" : "nem"}</p>
                  <p>Kiadás dátuma: {item.kiadasDatuma}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  </>)
}

export default App

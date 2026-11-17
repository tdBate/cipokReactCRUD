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
    <h2>Cipok lista</h2>
    <div className="container">
      <div className="row">
        <div className="col-sm-12 mb-3">
          <form onSubmit={handlePost}>
            <label htmlFor="nev">Név</label>
            <input value={nev} onChange={(e) => setNev(e.target.value)} name="nev" type="text" /><br />

            <label htmlFor="ar">Ár</label>
            <input value={ar} onChange={(e) => setAr(parseInt(e.target.value))} name="ar" type="number" /><br />

            <label htmlFor="raktaron">Raktáron</label>
            <input value={raktaron ? 0 : 1} onChange={(e) => setRaktaron(e.target.value == "checked" ? true : false)} name="raktaron" type="checkbox" /><br />

            <label htmlFor="date">Dátum</label>
            <input value={datum.toLocaleDateString("sv-SE")} onChange={(e) => setDatum(new Date(e.target.value))} name="date" type="date" /><br />

            <button type="submit">Submit</button>
          </form>
        </div>

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

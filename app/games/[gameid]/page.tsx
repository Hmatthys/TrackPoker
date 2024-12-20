import { createClient } from "@/utils/supabase/server";
import { notFound } from 'next/navigation';



function getYear(a: number): number{
  return Math.floor(a / 10000);
}
function getMonth(a: number): number{
  return (Math.floor(a / 100)) % 100;
}
function getDay(a: number): number{
  return a % 100
}


export default async function Game({ params: { gameid } }: { params: { gameid: string } }) {
  const supabase = createClient();

  const {data: gamedata, error: gamedataerror} = await supabase
  .from('game')
  .select()
  .eq('gameid', gameid);
  if(gamedataerror){
    return notFound()
  }
  const thisGame = gamedata[0]

  const { data: game, error } = await supabase
  .from('gameresult')
  .select('name, profit')
  .eq('game', gameid)
  .order('profit',{ ascending: false});
  if(error){
    return notFound()
  };
  
  return (
    <div style={{ width: 'clamp(300px, 100%, 900px', margin: '0 auto', padding: '1rem'}}>

      <div style={{ padding: '10px', top:'10px', fontSize: '1.2em' }}> 
        
        <h1><u>Date</u>: {getMonth(thisGame.gamedate)}/{getDay(thisGame.gamedate)}/{getYear(thisGame.gamedate)}</h1>
        <br></br>
        <h1><u>Location</u>: {thisGame.location}</h1>
        <br></br>
        </div>
        <div style={{  padding: '10px', margin: '15px', width: '100%', fontSize: '1.2em', backgroundColor: '#202c34', borderRadius: '16px' }}>
          <table style = {{ width: '100%' }}>
            <tr>
              <th style = {{textAlign: 'left', width: '70%', }}>Player</th>
              <th style = {{textAlign: 'center'}}>Profit</th>
            </tr>
            {game.map((game) => (
              <tr key={game.name} style= {{borderBottom: '1px solid gray'}}>
                <td>{game.name}</td>
                <td style = {{  textAlign: 'center' }}>{game.profit}</td>
              </tr>))}
            </table>
          </div>
        <br></br>
        <div style = {{  width: '100%' }}>

          <p style = {{ textAlign: 'center' }}>
            <u><a href={'/../..'}>Home</a></u>
          </p>
          
        </div>
      </div>
    
    
  );
}

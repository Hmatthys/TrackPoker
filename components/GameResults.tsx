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


export default async function Game({ params: { id } }: { params: { id: string } }) {
  const supabase = createClient();

  const {data: gamedata, error: gamedataerror} = await supabase
  .from('game')
  .select()
  .eq('gameid', id);
  if(gamedataerror){
    return notFound()
  }
  const thisGame = gamedata[0]

  const { data: game, error } = await supabase
  .from('gameresult')
  .select('name, profit')
  .eq('game', id)
  .order('profit',{ ascending: false});
  if(error){
    return notFound()
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '20px' }}>
      <div style={{ padding: '10px', top:'10px', fontSize: '1.2em' }}> 
        <h1><u>Date</u>: {getMonth(thisGame.gamedate)}/{getDay(thisGame.gamedate)}/{getYear(thisGame.gamedate)}</h1>
        <br></br>
        <h1><u>Location</u>: {thisGame.location}</h1>
        <br></br>
        <ul>
          {game.map((game) => (
            
            <p>{game.name}   :   {game.profit}</p>
          ))}

        </ul>
        <br></br>
        <u><a href={'/../..'}>Home</a></u>
      </div>
    </div>
  );
}

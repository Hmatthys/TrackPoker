import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';


export default async function Players() {

    const supabase = createClient();

    const { data: player } = await supabase.from('player').select('playerid, name');
    if(!player){
      return <p>No players</p>
    }
    return  player.map((player) => (
        <p key={player.playerid}>
        <Link href={`/players/${player.playerid}`}>{player.name}</Link>
        </p>
        ))
    

}
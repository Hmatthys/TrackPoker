import { createClient } from "@/utils/supabase/server";
import { notFound } from 'next/navigation';
import PlayerTable from "@/components/PlayerTable";
import GameTable from "@/components/GameTable";
import TotalChart from "@/components/TotalChart";





export default async function Index() {


    return (
        <div>
            <div style = {{width: '20%'}}>
                <PlayerTable />   
            </div>
            <div style = {{width: '20%'}}>
                <GameTable />
            </div>
            <div style = {{width: '100%'}}>
                <TotalChart />
            </div>
        </div>
       
    )

}
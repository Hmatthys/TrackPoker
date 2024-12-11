import { createClient } from "@/utils/supabase/server";
import { notFound } from 'next/navigation';
import PlayerTable from "@/components/PlayerTable";
import GameTable from "@/components/GameTable";
import TotalChart from "@/components/TotalChart";





export default async function Index() {


    return (
        <div style = {{display: 'inline-block'}}>
            <div>
                <PlayerTable />   
            </div>
            <div>
                <GameTable />
            </div>
            <div>
                <TotalChart />
            </div>
        </div>
       
    )

}
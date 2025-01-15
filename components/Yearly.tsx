import { createClient } from "@/utils/supabase/server";
import { notFound } from 'next/navigation';
import YearlyPlayer from "@/components/YearlyPlayer";
import YearlyGame from "@/components/YearlyGame";
import YearlyChart from "@/components/YearlyChart";





export default async function Index({year} : {year:number}) {


    return (
        <div>
            <div>
                <YearlyPlayer year={year} />   
            </div>
            <div>
                <YearlyGame year={year} />
            </div>
            <div>
                <YearlyChart year={year}/>
            </div>
        </div>
       
    )

}
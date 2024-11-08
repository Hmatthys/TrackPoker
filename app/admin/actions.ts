'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function submitGame(formData: FormData) {
    const supabase = await createClient()


    const {data: game, error: gameerror, count: numgames} = await supabase
        .from('game')
        .select('*', {count: 'exact', head: true})
        if(gameerror){
            redirect('../../')
        }
    
    const {data: session, error: sessionerror, count: numsessions} = await supabase
        .from('sessions')
        .select('*', {count: 'exact', head:true})
        if(sessionerror){
            redirect('../../')
        }
    
    const data = {
        date: formData.get('date') as string,
        location: formData.get('location') as string,
    }
    const playerdata = {
        players: formData.getAll('id'),
        profit: formData.getAll('profit'),
    }
    if(numgames && numsessions){
        const { error: createError } = await supabase
        .from('game')
        .insert({ gameid: numgames + 1, gamedate: data.date, location: data.location  })

        if(createError){
            redirect('../../')
        }

   
        

        let values: Array<{}> = [];
        let sum = 1
        playerdata.players.forEach((e, index) =>{
            if(playerdata.players[index] != "0"){
               values.push({sessionid: numsessions + sum, game: numgames + 1, player: e, profit: playerdata.profit[index]})
        
            sum += 1 
            }
            
        })
     
     const{ error: sessionsError } = await supabase
        .from('sessions')
        .insert(values)

        if(sessionsError){
            redirect('../../')
        }
    }
    
    revalidatePath('/', 'layout')
    redirect('/admin')
    
    
}
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
        profit: formData.getAll('profit') as Array<string>,
    }
    if(numgames && numsessions){
        

        let values: Array<{}> = []
        let sum = 1
        let profitSum = 0
        playerdata.players.forEach((e, index) =>{
            if(playerdata.players[index] != "0"){
               values.push({sessionid: numsessions + sum, game: numgames + 1, player: e, profit: parseFloat(playerdata.profit[index])})
                profitSum += parseFloat(playerdata.profit[index])
            sum += 1 
            }
            
        })
        if(profitSum != 0){
            //Catch profits not zero-ing out
            redirect('../../')
        }
     const { error: createError } = await supabase
        .from('game')
        .insert({ gameid: numgames + 1, gamedate: data.date, location: data.location  })

        if(createError){
            redirect('../../')
        }
     const{ error: sessionsError } = await supabase
        .from('sessions')
        .insert(values)

        if(sessionsError){
            redirect('../../')
        }
    }
    
    revalidatePath('/', 'layout')
    if(numgames){
       redirect(`/games/${numgames + 1}`) 
    }else{
        redirect('../../')
    }
}

export async function createPlayer(formData: FormData) {
    const supabase = await createClient()

    const {data: players, error: playererror, count: numplayers} = await supabase
        .from('player')
        .select('*', {count: 'exact', head: true})
        if(playererror){
            redirect('../../')
        }
        const data = {
            name: formData.get('name') as string,
        }
        if(numplayers){
            const{ error: playerAddError } = await supabase
            .from('player')
            .insert({playerid: numplayers + 1, name: data.name})
            if(playerAddError){
                redirect('../../')
            }

        }

        

        
    }



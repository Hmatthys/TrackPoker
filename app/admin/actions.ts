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
        

        
        const { data: game_data, error: createError } = await supabase
            .from('game')
            .insert({ gamedate: data.date, location: data.location  })
            .select()
            if(createError){
                redirect('../../')
            }

        
        let new_id = 0
        if(game_data){new_id = game_data[0].gameid} else{redirect('../../')}
            
        
            

        if(new_id){

            
            
            let values: Array<{}> = []
            let sum = 1
            let profitSum = 0
            // playerdata.players.forEach((e, index) =>{
            //     if(playerdata.players[index] != "0"){
            //         values.push({game: new_id , player: e, profit: playerdata.profit[index]})
            //         profitSum += parseFloat(playerdata.profit[index])
            //     sum += 1 
            //     }
                
            // })
            // if(profitSum != 0){
            //     //Catch profits not zero-ing out
            //     redirect('../../')
            // }
            for (let i = 0; i < 5; i++){
                values.push({game: new_id, player: 1, profit: 0})
            }
            
            const{ error: sessionsError } = await supabase
                .from('sessions')
                .insert(values)

                if(sessionsError){
                    redirect('../../')
                }
            
        
            revalidatePath('/', 'layout')
            if(numgames){
                redirect(`/games/${new_id}`) 
            }else{
                redirect('../../')
            }
        }
    }
}

export async function createPlayer(formData: FormData) {
    const supabase = await createClient()


        
        const data = {
            name: formData.get('name') as string,
        }
       
        const{ error: playerAddError } = await supabase
        .from('player')
        .insert({ name: data.name})
        if(playerAddError){
            redirect('../../')
        }
        

        
    }



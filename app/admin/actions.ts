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
    
    const data = {
        date: formData.get('date') as string,
        location: formData.get('location') as string,
    }
    if(numgames){
        const { error: createError } = await supabase
        .from('game')
        .insert({ gameid: numgames + 1, gamedate: data.date, location: data.location  })

        if(createError){
            redirect('../../')
        }

    }
    revalidatePath('/', 'layout')
    redirect('/admin')
    
    
}
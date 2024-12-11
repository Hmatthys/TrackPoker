
import { createClient } from "@/utils/supabase/server";


import React from 'react';
import {  Chart  } from 'primereact/chart';


export default async function Index() {

  const YEAR = 25

  const supabase = createClient();
  
  

    const {data: games, error: gameserror} = await supabase
        .from('game')
        .select()
        .gt('gamedate', YEAR * 10000)
    if(gameserror){
        return <p>Games error</p>
    }
    
    // Find the gameid of the first game of the year, all gameids after this will be of current year
        games.sort((a,b) => a.gamedate < b.gamedate ? -1 : a.gamedate > b.gamedate ? 1 : 0)

        const startGame = games[0].gameid

    const {data: players, error: playerserror} = await supabase
        .from('orderedresults')
        .select()
        .gte('latest_game', startGame) // Only take players who have played a session this year
        if(playerserror){
            return <p>Players error</p>
        }

    


    
    let results = new Array<Array<number>>
    let gameLabels = new Array<number>
    for(let j = 0; j < games.length + 1; j++){
        gameLabels.push(j);
    }
    for (let i = 0; i < players.length; i++){
        let playerResult = new Array<number>
        for(let j = 0; j < games.length + 1; j++){
            playerResult.push(0);
        }
        results.push(playerResult)
        let {data: playerSessions, error: playerSessionsError} = await supabase
            .from('sessions')
            .select('game, profit')
            .eq('player', players[i].playerid)
            .gt('game', startGame - 1); // only take sessions from this year
            if(playerSessionsError){
                return <p>playerSessionsError</p>
            }
        let total = 0;
        if(playerSessions == null){
            return <p> NULL</p>
        }
        for(let k = 0; k < playerSessions.length; k++){
           
            results[i][playerSessions[k].game] = playerSessions[k].profit
        }

        for(let l = 1; l < results[i].length; l++){
            results[i][l] += results[i][l-1] 
        }
        
    }
    
    let COLORS = ['aqua','bisque','blue','blueviolet','brown','yellow','cadetblue','chartreuse','chocolate','crimson','darkblue','darkcyan','darkgoldenrod','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray','green','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategrey','lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','rebeccapurple','red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue','slategray','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','wheat','white','whitesmoke','yellowgreen'];

    let sets = []
    for (let i = 0; i < players.length; i++){
        sets.push(
            {
                label: players[i].name,
                data: results[i],
                fill: false,
                borderColor: COLORS[i],
                tension: 0.4
            }
        )
    }

    const chartData = {
        labels: gameLabels,
        datasets: sets
    };
    const options = {
        elements: {
                    point:{
                        radius: 0
                    }
                }
    }

  return (     
    <div style={{  padding: '10px', margin: '15px', width: '100%', fontSize: '1.2em', backgroundColor: '#202c34', borderRadius: '16px' }}>
    <Chart type="line" data={chartData} options={options} />
    
    
    
    
    
    
    
    
    </div>      
      );
}
      

import { NextResponse } from "next/server";
const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest";
export async function GET(request:any){

    const {searchParams}=new URL(request.url)

    const searchText = searchParams.get('q')

    const result = await fetch(BASE_URL+'?q='+searchText+'?language=en&limit=6&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=US'+
        "&access_token=pk.eyJ1IjoidHViZWd1cnVqaSIsImEiOiJjbGp1ajY3bjYxNDBkM3JrYzF2eHlmbWQ3In0.y24htCFIAiuN_VHUE_3eg" ,{
        headers:{
            "Content-Type":"application/json"
        }
    })

    const searchResult = await result.json()
    return NextResponse.json(searchResult)
}
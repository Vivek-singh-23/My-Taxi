import { NextResponse } from "next/server";
const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest";
export async function GET(request:any){

    const {searchParams}=new URL(request.url)

    const searchText = searchParams.get('q')

    const result = await fetch(BASE_URL+'?q='+searchText+'?language=en&limit=6&session_token=add your mapbox session token here &country=US'+
        "&access_token=add your mapbox access token here" ,{
        headers:{
            "Content-Type":"application/json"
        }
    })

    const searchResult = await result.json()
    return NextResponse.json(searchResult)
}
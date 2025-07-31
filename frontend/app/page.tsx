'use client'
export default function Home() {
  
  const test = async () => {
    // const requestData = {
    //   name: "name",
    //   description: "description",
    //   domain: "DM",
    //   sub_domain: "Lifestyle",
    //   scenario: "Safety",
    //   weight: 1,
    //   created_by: "16f7_DM_01",
    //   is_public: 1,
    //   usage_count: 20000
    // }

    // const requestData = {
    //   id: 39
    // }

    const requestData = {
      num_rubrics: 50
    }

    // const response = await fetch(`http://0.0.0.0:8000/insert_one_to_table`, {
    
    // const response = await fetch(`http://0.0.0.0:8000/fetch_rubric_from_id`, {
      // method: "post",
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(requestData)
    // })

    const response = await fetch(`http://0.0.0.0:8000/fetch_recent_rubrics`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

    const data = await response.json();
    console.log(data)
    // console.log((await fetch(`http://0.0.0.0:8000/test`)).json());
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button className="bg-white rounded-2xl p-4 text-black" onClick={test}>
            the test button (yes I know this is text) :L
          </button>
        </div>
      </main>
    </div>
  );
}
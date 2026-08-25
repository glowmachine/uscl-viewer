import { useNavigate } from "react-router";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className='bg-gray-300 p-4 flex flex-col min-w-0 max-h-full h-screen'>
            <div className='bg-white rounded-xl h-full py-3'>
                <div className='min-w-0 h-full overflow-auto px-3 flex flex-col gap-3'>
                    <button
                        onClick={() => navigate(-1)}
                        className='mt-2 shrink-0 w-10 h-10 rounded-full hover:bg-gray-200 active:bg-gray-300 grid place-items-center'>
                        <span className='material-symbols-outlined'>arrow_back</span>
                    </button>
                    <div className='flex justify-center'>
                        <section className='w-[55vw] flex flex-col gap-2 sm:gap-10 *:text-lg'>
                            <div>
                                <h2 className='font-bold text-2xl'>About</h2>
                                <p>Legislator information is sourced from unitedstates/congress-legislators, a public GitHub repository of congressional data maintained by volunteers in YAML text files. This project fetches records related to the current legislators in Congress and formats it for simple browsing, making it easier to browse and check for missing or out of date info.</p>
                            </div>
                            <div>
                                <h2 className='font-bold text-2xl'>How to use:</h2>
                                <ul className='ml-4 list-disc'>
                                    <li>Search: the search field at the top can be used to lookup legislators by entering any part of any of their names.</li>
                                    <li>Filter: the filter button in the search field provides options to narrow results by state, party, and/or type.</li>
                                    <li>Columns: sort column data by clicking on table headers, and click the columns icon to select what to view by the names of keys used in the database.</li>
                                    <li>Links: some values are connected to different resources and can be clicked to visit their respective websites, profiles, and social media pages.</li>
                                    <li>Details: click on a legislator to view their details page, where you can find the relevant text for their entry in the unitedstates/congress-legislators text files. Grayed out values are not present in the database (missing, unavailable, or not applicable).</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className='font-bold text-2xl'>Feedback:</h2>
                                <ul className='ml-4 list-disc'>
                                    <li>If you have found any bugs to report or features to request, please open a GitHub issue.</li>
                                    <li>If you have found any broken or incorrect information, please consider contributing to unitedstates/congress-legislators.</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
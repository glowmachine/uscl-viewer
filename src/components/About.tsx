import { useNavigate } from "react-router";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className='min-w-0 h-full overflow-auto px-5 pb-5 flex flex-col gap-3'>
            <button
                onClick={() => navigate(-1)}
                className='mt-2 shrink-0 w-10 h-10 rounded-full grid place-items-center
                hover:bg-zinc-200 active:bg-zinc-300
                dark:hover:bg-zinc-700 dark:active:bg-zinc-600'>
                <span className='material-symbols-outlined'>arrow_back</span>
            </button>
            <div className='flex justify-center'>
                <section className='w-[min(1000px,80vw)] flex flex-col gap-3 sm:gap-6 *:text-lg'>
                    <div>
                        <h2 className='font-bold text-2xl'>About USCLV</h2>
                        <p>"United States Congress Legislators Viewer" sources information from <a href='https://github.com/unitedstates/congress-legislators' target='_blank' rel='noopener noreferrer' className='underline'>unitedstates/congress-legislators</a>, a public GitHub repo of congressional data maintained by volunteers in YAML text files. This project fetches the records related to current legislators in Congress and formats them for simple browsing, making it easier to look up and check for missing or out-of-date info. USCLV is not associated with the official repository.</p>
                    </div>
                    <div>
                        <h2 className='font-bold text-2xl'>How to Use</h2>
                        <ul className='ml-4 list-disc'>
                            <li>Search: the search field at the top can be used to find legislators by entering any part of any of their names.</li>
                            <li>Filter: the filter button provides options to narrow results by state, party, and/or type.</li>
                            <li>Columns: click the table headers to sort column data, click the columns icon to select what values to view by the names of keys used in the database.</li>
                            <li>Links: some values are connected to different resources and can be clicked to visit their respective websites, profiles, or social media pages.</li>
                            <li>Details: click on a legislator's name to view their details page, where you can find the text records for their entry in the source YAML files. Grayed out values are not present in the database (missing, unavailable, or not applicable) and are only displayed for reference.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='font-bold text-2xl'>Feedback</h2>
                        <ul className='ml-4 list-disc'>
                            <li>If you have found any bugs to report or features to request, please open a GitHub issue <a href='https://github.com/glowmachine/congress-search-v3' target='_blank' rel='noopener noreferrer' className='underline'>here</a>.</li>
                            <li>If you have found any broken or incorrect information, please consider contributing to the unitedstates/congress-legislators project <a href='https://github.com/unitedstates/congress-legislators' target='_blank' rel='noopener noreferrer' className='underline'>here</a>.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
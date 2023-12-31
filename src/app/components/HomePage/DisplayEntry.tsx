import React from 'react'
import type { JournalType } from "../../../lib/types/JournalType";
import { getAllEntries } from "../../actions";
import Link from 'next/link';
import { lato, raleway, nunito } from '@/styles/fonts';

const DisplayEntry: React.FC = async () => {
    const entries: Record<string, { entries: JournalType[] }> = await getAllEntries();

    if (Object.keys(entries).length === 0) {
      console.error('No entries data found');
      return <div>No entries found</div>;
    }
  
    return (
        <div>
        {Object.entries(entries).map(([date, { entries }]) => (
          <div key={date} className={`${nunito.variable} border p-4 mb-4 rounded-md font`}>
            <h2 className="text-xl font-bold mb-2">{date}</h2>
            <ul>
              {entries.map((entry: JournalType) => (
                <li key={entry.id} className="border p-2 mb-2 rounded-md">
                  {entry.title ? (
                    <Link href={`/entry/${entry.id}`} className={`${lato.variable}`}>
                      {entry.title}
                    </Link>
                  ) : (
                    <Link href={`/entry/${entry.id}`}>
                      <div className={`${raleway.variable}`}>{entry.content}</div>
                    </Link>  
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
}

export default DisplayEntry
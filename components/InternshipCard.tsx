import React from 'react';
import { Internship } from '../types';
import ProgressBar from './ProgressBar';

interface InternshipCardProps {
    internship: Internship;
    onToggleSave: (internship: Internship) => void;
    isSaved: boolean;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onToggleSave, isSaved }) => {
    return (
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-grow pr-4">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{internship.company}</p>
                    <h4 className="text-xl font-medium text-neutral-900 dark:text-white">{internship.role}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">{internship.location} &bull; {internship.field}</p>
                </div>
                <button
                    onClick={() => onToggleSave(internship)}
                    className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                        isSaved
                            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:ring-neutral-500'
                    }`}
                    aria-label={isSaved ? 'Unsave this internship' : 'Save this internship'}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </button>
            </div>

            {internship.matchScore !== undefined && (
                <div className="mb-5">
                    <div className="flex justify-between items-baseline mb-1">
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Match Score</p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">{internship.matchScore}%</p>
                    </div>
                    <ProgressBar percentage={internship.matchScore || 0} />
                </div>
            )}
            
             {internship.reasoning && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 italic border-l-2 border-neutral-300 dark:border-neutral-700 pl-3 mb-5">
                    {internship.reasoning}
                </p>
            )}

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5">{internship.description}</p>

            <div>
                <h5 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Skills Required:</h5>
                <div className="flex flex-wrap gap-2">
                    {internship.skillsRequired.map(skill => (
                        <span key={skill} className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium px-2.5 py-1 rounded-md">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InternshipCard;
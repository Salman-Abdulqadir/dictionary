import React from "react";
import AudioPlayer from "../../AudioPlayer";
import { capitalize } from "../../../utils/utils";
import { FaRegBookmark } from "react-icons/fa";

const WordPronounciation = ({ wordMeaning }) => {
  const phonetic = wordMeaning?.phonetics?.find(
    (phonetic) => phonetic.text
  )?.text;
  const audioSrc = wordMeaning?.phonetics?.find(
    (phonetic) => phonetic.audio
  )?.audio;
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="font-bold text-6xl">{capitalize(wordMeaning.word)}</h3>
        <p className="text-xl text-primary mt-2">{phonetic}</p>
      </div>
      {!!audioSrc && <AudioPlayer audioSrc={audioSrc} />}
    </div>
  );
};

const SynonymsAndAntonyms = ({ synonyms, antonyms, onWordClick }) => {
  const getList = (title, list) => {
    return (
      <div className="flex items-start gap-2">
        <h4>{title}</h4>
        <div className="flex flex-wrap">
          {list.map((item, index) => (
            <h4
              className="font-bold text-primary hover:text-primary-content cursor-pointer transition-all duration-300"
              onClick={() => onWordClick(item)}
              key={`${title}-${index}`}
            >
              {capitalize(item)}
              {index !== list?.length - 1 && ", "}
            </h4>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {!!synonyms.length && getList("Synonyms", synonyms)}
      {!!antonyms.length && getList("Antonyms", antonyms)}
    </div>
  );
};

const Definition = ({ definition }) => {
  return (
    <div>
      <h4 className="text-xl">Meaning</h4>
      <ul className="pl-8 list-disc flex flex-col gap-3 mt-4">
        {(definition.definitions || []).map((definition, index) => (
          <li key={`meaninglist-${index}`} className={"marker:text-purple-800"}>
            {definition?.definition}
            {definition?.example && (
              <div className="block bg-base-300 text-base-content p-4 rounded-lg mt-4">
                <strong> Example:</strong>
                <p className="mt-2">{definition?.example}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Definitions = ({ origin, definitions, onWordClick }) => {
  return (
    <div>
      {!!origin && <h4>{origin}</h4>}
      {definitions?.map((definition, index) => (
        <div key={index}>
          <div className="divider divider-start">
            <h4 className="text-xl font-bold">
              {capitalize(definition?.partOfSpeech)}
            </h4>
          </div>
          <div className="mt-6">
            <Definition definition={definition} />
            <SynonymsAndAntonyms
              synonyms={definition?.synonyms}
              antonyms={definition?.antonyms}
              onWordClick={onWordClick}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const Reference = ({ sourceUrls }) => {
  return (
    <div className="">
      <div className="divider"></div>
      <div className="flex flex-col gap-4 mt-4">
        {sourceUrls?.map((source, index) => (
          <div key={index} className="flex items-center gap-1">
            <FaRegBookmark /> Source:
            <a
              className=" hover:text-primary transition-colors duration-200"
              key={`reference-${index}`}
              href={source}
            >
              {source}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const DictionaryResult = ({ wordMeaning, onWordClick }) => {
  return (
    <div className={"flex-1 flex flex-col gap-2 flex-grow mt-4"}>
      <WordPronounciation wordMeaning={wordMeaning} />
      <Definitions
        origin={wordMeaning?.origin}
        definitions={
          Array.isArray(wordMeaning?.meanings) ? wordMeaning?.meanings : []
        }
        onWordClick={onWordClick}
      />
      <Reference sourceUrls={wordMeaning.sourceUrls} />
    </div>
  );
};

export default DictionaryResult;

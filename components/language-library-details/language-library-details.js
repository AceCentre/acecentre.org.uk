import { queryTypes } from "next-usequerystate";

const getValue = (x) => {
  if (x == undefined) {
    return "";
  }

  return x.toString();
};

export const DETAILS_CONFIG = {
  sections: [
    {
      name: "General",
      slug: "general",
      sections: [
        {
          slug: "languages",
          queryType: queryTypes.array(queryTypes.string).withDefault([]),
          name: "Languages",
          tooltip: "The languages the resource is in",
          getAllUniqueValues: (resources, results) => {
            let byKey = {};

            for (let resource of resources) {
              for (let current of resource.languages) {
                byKey[current.slug] = {
                  slug: current.slug,
                  name: current.name,
                  count: 0,
                };
              }
            }

            for (let resource of results) {
              for (let current of resource.languages) {
                byKey[current.slug].count += 1;
              }
            }

            return Object.values(byKey)
            .sort((a, b) => {
              // Primary sort by count (descending)
              const countDiff = b.count - a.count;
              if (countDiff !== 0) return countDiff;
              
              // Secondary sort by name (ascending) when counts are equal
              return a.name.localeCompare(b.name);
            });
          },
          getDetail: (resource) =>
            resource.languages.map((x) => x.name).join(", "),
          getFilterValues: (resource) => resource.languages.map((x) => x.slug),
        },
        {
          slug: "does_this_vocabulary_cost_to_access_multi",
          queryType: queryTypes.array(queryTypes.string).withDefault([]),
          name: "Does this vocabulary cost to access?",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.does_this_vocabulary_cost_to_access_multi
            );
            const field = fields.find(
              (x) => x.name == "does_this_vocabulary_cost_to_access_multi"
            );

            const values = value.split("|").map((x) => x.trim());
            const fullValues = values.map((x) => field.options[x]);

            return fullValues.join(", ");
          },
        },

        {
          name: "Format",
          slug: "format",
          queryType: queryTypes.array(queryTypes.string).withDefault([]),
          tooltip:
            "If the resource is designed to be used as high-tech or low-tech",
          getAllUniqueValues: (resources, results, fields) => {
            let byKey = {};

            const field = fields.find((x) => x.name == "format_");
            let values = Object.keys(field.options);

            for (const value of values) {
              byKey[value] = {
                slug: value,
                name: field.options[value],
                count: 0,
              };
            }

            for (const resource of results) {
              const current = getValue(resource?.meta?.format_);
              if (current !== "" && byKey[current]) {
                byKey[current].count += 1;
              }
            }

            return Object.values(byKey);
          },
          getFilterValues: (resource) => {
            const current = resource?.meta?.format_ || [];
            return current.filter((x) => x !== "");
          },
          getDetail: (resource, fields) => {
            const value = getValue(resource?.meta?.format_);
            const field = fields.find((x) => x.name == "format_");

            return field.options[value];
          },
        },
        {
          name: "Translation Method",
          slug: "translationMethod",
          allowFilter: false,
          queryType: queryTypes.array(queryTypes.string).withDefault([]),
          tooltip: "How the resource was translated",
          getDetail: (resource, fields) => {
            const value = getValue(resource?.meta?.who_created_the_resource_);

            const field = fields.find(
              (x) => x.name == "who_created_the_resource_"
            );

            if (value == "other_") {
              return getValue(
                resource?.meta?.other_translation_method__please_specify_
              );
            }

            return field.options[value];
          },
          getFilterValues: (resource) => {
            const current = resource?.meta?.who_created_the_resource_ || [];
            return current.filter((x) => x !== "");
          },
        },

        {
          name: "Supplier",
          slug: "supplier",
          allowFilter: false,
          queryType: queryTypes.array(queryTypes.string).withDefault([]),
          tooltip: "Who to contact to get the vocabulary",

          getDetail: (resource) => {
            return getValue(resource?.meta?.supplier);
          },
        },
        {
          name: "Software Required",
          slug: "software_required",
          allowFilter: false,
          queryType: queryTypes.array(queryTypes.string).withDefault([]),
          tooltip:
            "What software is needed to use the vocabulary? e.g. windows, iOS, android, Boardmaker, InPrint3",

          getDetail: (resource) => {
            return getValue(resource?.meta?.software_required);
          },
        },
      ],
    },
    {
      name: "Text To Speech",
      slug: "tts",
      sections: [
        {
          name: "Are voices available in the same language(s) as the vocabulary?",
          slug: "are_text_to_speech_voices_available_in_the_same_language_s__as_the_vocabulary_",
          allowFilter: true,
          queryType: queryTypes.array(queryTypes.string).withDefault([]),

          getAllUniqueValues: (resources, results, fields) => {
            let byKey = {};

            const field = fields.find(
              (x) =>
                x.name ==
                "are_text_to_speech_voices_available_in_the_same_language_s__as_the_vocabulary_"
            );
            let values = Object.keys(field.options);

            for (const value of values) {
              byKey[value] = {
                slug: value,
                name: field.options[value],
                count: 0,
              };
            }

            for (const resource of results) {
              const current = getValue(
                resource?.meta
                  ?.are_text_to_speech_voices_available_in_the_same_language_s__as_the_vocabulary_
              );
              if (current !== "" && byKey[current]) {
                byKey[current].count += 1;
              }
            }

            return Object.values(byKey);
          },
          getFilterValues: (resource) => {
            const current =
              resource?.meta
                ?.are_text_to_speech_voices_available_in_the_same_language_s__as_the_vocabulary_ ||
              [];
            return current.filter((x) => x !== "");
          },
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.are_text_to_speech_voices_available_in_the_same_language_s__as_the_vocabulary_
            );
            const field = fields.find(
              (x) =>
                x.name ==
                "are_text_to_speech_voices_available_in_the_same_language_s__as_the_vocabulary_"
            );

            return field.options[value];
          },
        },
        {
          name: "What voices are available?",
          slug: "what_voices_are_available__tick_all_that_apply___",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.what_voices_are_available__tick_all_that_apply___
            );
            const values = value.split("|").map((x) => x.trim());

            const field = fields.find(
              (x) =>
                x.name == "what_voices_are_available__tick_all_that_apply___"
            );

            return values.map((x) => field.options[x]).join(", ");
          },
        },
        {
          name: "Does the system need internet access for the voice to run?",
          slug: "does_the_system_need_internet_access_for_the_voice_to_run_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.does_the_system_need_internet_access_for_the_voice_to_run_
            );
            const field = fields.find(
              (x) =>
                x.name ==
                "does_the_system_need_internet_access_for_the_voice_to_run_"
            );

            return field.options[value];
          },
        },
      ],
    },
    {
      name: "Vocabulary",
      slug: "vocab",
      sections: [
        {
          name: "Is the settings/software menu available in the same language(s) as the vocabulary?",
          slug: "is_the_settings_software_menu_available_in_the_same_language_s__as_the_vocabulary_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.is_the_settings_software_menu_available_in_the_same_language_s__as_the_vocabulary_
            );
            const field = fields.find(
              (x) =>
                x.name ==
                "is_the_settings_software_menu_available_in_the_same_language_s__as_the_vocabulary_"
            );

            console.log(field, value);

            if (value === "other") {
              return getValue(
                resource?.meta
                  ?.other___is_the_settings_software_menu_available_in_the_same_language_s__as_the_vocabulary_
              );
            }

            return field.options[value];
          },
        },
        {
          name: "Does the package support code switching (speaking two or more languages within one sentence/message bar)? ",
          slug: "_does_the_package_support_code_switching__speaking_two_or_more_languages_within_one_sentence_message_bar___",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?._does_the_package_support_code_switching__speaking_two_or_more_languages_within_one_sentence_message_bar___
            );
            const field = fields.find(
              (x) =>
                x.name ==
                "_does_the_package_support_code_switching__speaking_two_or_more_languages_within_one_sentence_message_bar___"
            );

            return field.options[value];
          },
        },
        {
          name: "Can the user switch between languages while staying in the vocabulary package? (E.g via a link on the home page or tool bar etc)",
          slug: "can_the_user_switch_between_languages_while_staying_in_the_vocabulary_package___e_g_via_a_link_on_the_home_page_or_tool_bar_etc_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.can_the_user_switch_between_languages_while_staying_in_the_vocabulary_package___e_g_via_a_link_on_the_home_page_or_tool_bar_etc_
            );
            const field = fields.find(
              (x) =>
                x.name ==
                "can_the_user_switch_between_languages_while_staying_in_the_vocabulary_package___e_g_via_a_link_on_the_home_page_or_tool_bar_etc_"
            );

            return field.options[value];
          },
        },
        {
          name: "When the vocabulary was created what features of the language were considered?",
          slug: "describe_how_the_creation_of_the_vocabulary_package_considered_the_language_that_it_is_for___",
          allowFilter: false,
          getDetail: (resource) => {
            const value = getValue(
              resource?.meta
                ?.describe_how_the_creation_of_the_vocabulary_package_considered_the_language_that_it_is_for___
            );

            return value;
          },
        },
        {
          name: "Is it a Text-only or Symbol + Text vocabulary?",
          slug: "is_it_a_text_only_or_symbol___text_vocabulary_",
          allowFilter: true,
          queryType: queryTypes.array(queryTypes.string).withDefault([]),

          getAllUniqueValues: (resources, results, fields) => {
            let byKey = {};

            const field = fields.find(
              (x) => x.name == "is_it_a_text_only_or_symbol___text_vocabulary_"
            );
            let values = Object.keys(field.options);

            for (const value of values) {
              byKey[value] = {
                slug: value,
                name: field.options[value],
                count: 0,
              };
            }

            for (const resource of results) {
              const current = getValue(
                resource?.meta?.is_it_a_text_only_or_symbol___text_vocabulary_
              );
              if (current !== "" && byKey[current]) {
                byKey[current].count += 1;
              }
            }

            return Object.values(byKey);
          },
          getFilterValues: (resource) => {
            const current =
              resource?.meta?.is_it_a_text_only_or_symbol___text_vocabulary_ ||
              [];
            return current.filter((x) => x !== "");
          },
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.is_it_a_text_only_or_symbol___text_vocabulary_
            );

            const field = fields.find(
              (x) => x.name == "is_it_a_text_only_or_symbol___text_vocabulary_"
            );

            return field.options[value];
          },
        },
      ],
    },
    {
      name: "Text Only",
      slug: "text-only",
      sections: [
        {
          name: "What keyboards are available?",
          slug: "what_keyboards_are_available__",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.what_keyboards_are_available__
            );

            const field = fields.find(
              (x) => x.name == "what_keyboards_are_available__"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there word prediction?",
          slug: "is_there_word_prediction__",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(resource?.meta?.is_there_word_prediction__);

            const field = fields.find(
              (x) => x.name == "is_there_word_prediction__"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there sentence prediction? (the system will guess which words you are likely to need next)",
          slug: "is_there_sentence_prediction___the_system_will_guess_which_words_you_are_likely_to_need_next_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.is_there_sentence_prediction___the_system_will_guess_which_words_you_are_likely_to_need_next_
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "is_there_sentence_prediction___the_system_will_guess_which_words_you_are_likely_to_need_next_"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there a bank of prestored phrases?",
          slug: "is_there_a_bank_of_prestored_phrases_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.is_there_a_bank_of_prestored_phrases_
            );

            const field = fields.find(
              (x) => x.name == "is_there_a_bank_of_prestored_phrases_"
            );

            return field.options[value];
          },
        },
        {
          name: "Can the bank of prestored phrases be edited with the users own phrases?",
          slug: "can_the_bank_of_prestored_phrases_be_edited_with_the_users_own_phrases__",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.can_the_bank_of_prestored_phrases_be_edited_with_the_users_own_phrases__
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "can_the_bank_of_prestored_phrases_be_edited_with_the_users_own_phrases__"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there the option for symbol support on the text?",
          slug: "is_there_the_option_for_symbol_support_on_the_text___",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.is_there_the_option_for_symbol_support_on_the_text___
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "is_there_the_option_for_symbol_support_on_the_text___"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there a translation function available?",
          slug: "_is_there_a_translation_function_available_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?._is_there_a_translation_function_available_
            );

            const field = fields.find(
              (x) => x.name == "_is_there_a_translation_function_available_"
            );

            return field.options[value];
          },
        },
      ],
    },
    {
      name: "Symbol + Text",
      slug: "symbol",
      sections: [
        {
          name: "Are there written labels on the cells as well as symbols?",
          slug: "are_there_written_labels_on_the_cells_as_well_as_symbols_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.are_there_written_labels_on_the_cells_as_well_as_symbols_
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "are_there_written_labels_on_the_cells_as_well_as_symbols_"
            );

            return field.options[value];
          },
        },

        {
          name: "Is it possible to have two labels on the cell with the symbol?",
          slug: "is_it_possible_to_have_two_labels_on_the_cell_with_the_symbol__",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.is_it_possible_to_have_two_labels_on_the_cell_with_the_symbol__
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "is_it_possible_to_have_two_labels_on_the_cell_with_the_symbol__"
            );

            return field.options[value];
          },
        },

        {
          name: "Is it possible to add written labels to the cells?",
          slug: "_is_it_possible_to_add_written_labels_to_the_cells_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?._is_it_possible_to_add_written_labels_to_the_cells_
            );

            const field = fields.find(
              (x) =>
                x.name == "_is_it_possible_to_add_written_labels_to_the_cells_"
            );

            return field.options[value];
          },
        },
        {
          name: "Is it possible to have symbol-only page sets? (i.e no written labels)",
          slug: "is_it_possible_to_have_symbol_only_page_sets___i_e_no_written_labels__",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.is_it_possible_to_have_symbol_only_page_sets___i_e_no_written_labels__
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "is_it_possible_to_have_symbol_only_page_sets___i_e_no_written_labels__"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there a keyboard available?",
          slug: "is_there_a_keyboard_available_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.is_there_a_keyboard_available_
            );

            const field = fields.find(
              (x) => x.name == "is_there_a_keyboard_available_"
            );

            return field.options[value];
          },
        },
        {
          name: "What keyboards are available?",
          slug: "which_keyboards_are_available",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.which_keyboards_are_available
            );

            const field = fields.find(
              (x) => x.name == "which_keyboards_are_available"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there a search function/word finder?",
          slug: "is_there_a_search_function_word_finder_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.is_there_a_search_function_word_finder_
            );

            const field = fields.find(
              (x) => x.name == "is_there_a_search_function_word_finder_"
            );

            return field.options[value];
          },
        },
        {
          name: "Can you change the skin tone of symbols?",
          slug: "can_you_change_the_skin_tone_of_symbols_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.can_you_change_the_skin_tone_of_symbols_
            );

            const field = fields.find(
              (x) => x.name == "can_you_change_the_skin_tone_of_symbols_"
            );

            return field.options[value];
          },
        },
        {
          name: "Can the vocabulary content be personalised for the individual?",
          slug: "can_the_vocabulary_content_be_personalised_for_the_individual_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.can_the_vocabulary_content_be_personalised_for_the_individual_
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "can_the_vocabulary_content_be_personalised_for_the_individual_"
            );

            return field.options[value];
          },
        },
        {
          name: "What level of language ability does this package support? (pick the best fit category)",
          slug: "what_level_of_language_ability_does_this_package_support_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.what_level_of_language_ability_does_this_package_support_
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "what_level_of_language_ability_does_this_package_support_"
            );

            return value
              .split("|")
              .map((x) => x.trim())
              .map((x) => field.options[x])
              .join("\n");
          },
        },
        {
          name: "What topics of conversation does the system support? (choose the best fit category)",
          slug: "what_topics_of_conversation_does_the_system_support___choose_the_best_fit_category_",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta
                ?.what_topics_of_conversation_does_the_system_support___choose_the_best_fit_category_
            );

            const field = fields.find(
              (x) =>
                x.name ==
                "what_topics_of_conversation_does_the_system_support___choose_the_best_fit_category_"
            );

            return field.options[value];
          },
        },
        {
          name: "Is there a translation function available?",
          slug: "is_there_a_translation_function_available__",
          allowFilter: false,
          getDetail: (resource, fields) => {
            const value = getValue(
              resource?.meta?.is_there_a_translation_function_available__
            );

            const field = fields.find(
              (x) => x.name == "is_there_a_translation_function_available__"
            );

            return field.options[value];
          },
        },
      ],
    },
  ],
};

export const flatSections = (config) =>
  config.sections.flatMap((x) => x.sections);

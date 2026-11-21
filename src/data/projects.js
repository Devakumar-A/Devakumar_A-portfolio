// Facts come from the résumé. Nothing here is estimated or invented.
const GH = "https://github.com/Devakumar-A";

export const projects = [
  {
    id: "eeg",
    model: "DK-01",
    short: "EEG.NET",
    colorway: "bone",
    category: "Research · Published",
    title: "EEG Communication Aid",
    subtitle: "Deep learning for paralyzed patients",
    description:
      "A multi-task brain-computer interface that reads EEG signals to detect intent, recognise emotion and classify pain severity inside one model.",
    metric: { value: "89%", label: "Overall accuracy", note: "86–92% across 3 tasks" },
    specs: ["Intent detection", "Emotion recognition", "Pain severity classification", "One multi-task architecture"],
    tech: ["Python", "TensorFlow", "Keras", "EEGNet", "MNE"],
    links: [
      { label: "Source", href: `${GH}/EEG-Communication-Aid` },
      { label: "Paper", href: "https://doi.org/10.25258/ijddt.16.58s.21" },
    ],
    visual: "eeg",
  },
  {
    id: "aqua",
    model: "DK-02",
    short: "AQUA.CMD",
    colorway: "steel",
    category: "Full-Stack · AI Platform",
    title: "AquaCommandAI",
    subtitle: "Water resource intelligence platform",
    description:
      "A full-stack platform that serves four ML models through a FastAPI backend to a React analytics dashboard for agricultural planning.",
    metric: { value: "04", label: "ML models", note: "One platform" },
    specs: ["Crop recommendation", "Yield prediction", "Irrigation forecasting", "Reservoir risk"],
    tech: ["React.js", "FastAPI", "Python", "Scikit-learn", "PostgreSQL"],
    links: [{ label: "Source", href: `${GH}/AquaCommandAI` }],
    visual: "aqua",
  },
  {
    id: "movieverse",
    model: "DK-03",
    short: "MOVIE.AI",
    colorway: "lilac",
    category: "Multi-Modal AI",
    title: "MovieVerse AI",
    subtitle: "Genre classification & recommendation",
    description:
      "Fuses BERT text embeddings with ResNet50 image features to predict movie genres from plot, poster and trailer data.",
    metric: { value: "02", label: "Modalities fused", note: "Text + image" },
    specs: ["Plot text to BERT embeddings", "Poster image to ResNet50 features", "Confidence-based multi-genre output"],
    tech: ["Python", "TensorFlow", "BERT", "OpenCV", "ResNet50"],
    links: [{ label: "Source", href: `${GH}/MovieVerse-AI-Multimodal-Genre-Classification` }],
    visual: "movie",
  },
];

export const allProjectsHref = GH;

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  description?: string;
  cover_image: string;
  secondary_image: string;
  gallery: string[];
  hero_image?: string;
  video_url?: string;
  video_poster?: string;
  live_url?: string;
  published: boolean;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
};


/*
 * -------------------------------------------------------
 * LOCAL PORTFOLIO PROJECTS
 * -------------------------------------------------------
 *
 * Individual project images:
 *
 *   src/assets/projects/image.png
 *
 * Multi-image projects:
 *
 *   src/assets/projects/Brand Identity/image1.png
 *   src/assets/projects/Brand Identity/image2.png
 *
 * Each folder represents ONE project.
 */

const files = import.meta.glob(
  "../assets/projects/**/*.{png,jpg,jpeg,webp,gif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;


/* -------------------------------------------------------
   CATEGORY LIST
------------------------------------------------------- */

const CATEGORIES = [
  "Graphic Design",
  "Video Editing",
  "UI/UX",
  "Branding",
  "Web Design",
  "Motion",
  "Creative Direction",
  "Social Media",
];


/* -------------------------------------------------------
   FILENAME CATEGORY RULES
------------------------------------------------------- */

const categoryRules: Array<[string, string[]]> = [
  [
    "Video Editing",
    [
      "podcast",
      "reel",
      "short",
      "video",
      "edit",
      "editing",
    ],
  ],

  [
    "UI/UX",
    [
      "ui",
      "ux",
      "interface",
      "app",
      "dashboard",
      "mobile",
      "game",
    ],
  ],

  [
    "Web Design",
    [
      "website",
      "web",
      "landing",
      "homepage",
      "hero",
    ],
  ],

  [
    "Branding",
    [
      "brand",
      "branding",
      "identity",
      "logo",
      "commission",
      "fund",
    ],
  ],

  [
    "Motion",
    [
      "motion",
      "animation",
      "animated",
      "kinetic",
    ],
  ],

  [
    "Social Media",
    [
      "social",
      "instagram",
      "facebook",
      "campaign",
      "post",
      "story",
    ],
  ],

  [
    "Creative Direction",
    [
      "creative",
      "direction",
      "art",
      "concept",
    ],
  ],
];


/* -------------------------------------------------------
   GET CATEGORY FROM FILENAME
------------------------------------------------------- */

function getCategory(path: string): string {
  const filename =
    path
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "")
      .toLowerCase() ?? "";

  for (const [category, keywords] of categoryRules) {
    if (
      keywords.some((keyword) =>
        filename.includes(keyword.toLowerCase()),
      )
    ) {
      return category;
    }
  }

  return "Graphic Design";
}


/* -------------------------------------------------------
   PROJECT FOLDER CONFIGURATION
------------------------------------------------------- */

const projectConfig: Record<
  string,
  {
    name: string;
    category: string;
    description: string;
  }
> = {

  /* -----------------------------------------------------
     BRANDING
  ----------------------------------------------------- */

  "Brand Identity": {
    name: "Brand Identity Pitch Deck",
    category: "Branding",
    description:
      "A cohesive brand identity system developed across visual direction, colour, typography, presentation and real-world applications.",
  },

    /* -----------------------------------------------------
    THE AFTER REP
  ----------------------------------------------------- */

  "THE AFTER REP": {
  name: "THE AFTER REP",
  category: "Graphic Design",
  description:
    "A complete campaign design system developed across promotional posters, visual direction, digital applications, gym screens and point-of-sale advertising.",
},


  /* -----------------------------------------------------
     UI/UX
  ----------------------------------------------------- */

  "LinkedIn Launch": {
    name: "LinkedIn Launch Asset",
    category: "UI/UX",
    description:
      "A polished digital launch asset designed with a strong visual hierarchy and clear communication.",
  },

  "Analytics Dashboard": {
    name: "Analytics Dashboard",
    category: "UI/UX",
    description:
      "Dashboard interface concept focused on clear information hierarchy, usability, and visual organization.",
  },

  "Website Hero": {
    name: "Website Hero Section",
    category: "UI/UX",
    description:
      "Website hero interface concept focused on strong visual hierarchy and an engaging first impression.",
  },
};


/* -------------------------------------------------------
   TITLE FROM FILENAME
------------------------------------------------------- */

const titleFromFilename = (path: string) => {
  const filename =
    path.split("/").pop() ?? "Untitled Project";

  const withoutExtension =
    filename.replace(/\.[^/.]+$/, "");

  return withoutExtension
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};


/* -------------------------------------------------------
   GET PARENT FOLDER
------------------------------------------------------- */

const getParentFolder = (path: string) => {
  const parts = path.split("/");

  /*
   * Example:
   *
   * ../assets/projects/Brand Identity/01-logo-evolution.png
   *
   * returns:
   *
   * Brand Identity
   */

  if (parts.length < 2) {
    return null;
  }

  return parts[parts.length - 2];
};


/* -------------------------------------------------------
   BUILD ROOT-LEVEL PROJECTS
------------------------------------------------------- */

const rootProjects: Project[] = [];


/* -------------------------------------------------------
   BUILD FOLDER PROJECTS
------------------------------------------------------- */

const groupedProjects = new Map<
  string,
  {
    name: string;
    category: string;
    description: string;
    images: string[];
  }
>();


Object.entries(files)
  .sort(([a], [b]) =>
    a.localeCompare(
      b,
      undefined,
      {
        numeric: true,
      },
    ),
  )
  .forEach(([path, url]) => {

    const parentFolder =
      getParentFolder(path);


    /* ---------------------------------------------------
       ROOT-LEVEL IMAGE

       Example:

       projects/Navratri_2.jpg

       This remains an individual project.
    --------------------------------------------------- */

    if (
      !parentFolder ||
      parentFolder === "projects"
    ) {

      const name =
        titleFromFilename(path);

      const category =
        getCategory(path);

      rootProjects.push({
        id:
          `local-project-${rootProjects.length + 1}`,

        number:
          String(
            rootProjects.length + 1,
          ).padStart(2, "0"),

        name,

        category,

        description:
          `Selected ${category.toLowerCase()} work by Saptaraj.`,

        cover_image: url,

        secondary_image: "",

        gallery: [url],

        published: true,

        featured:
          rootProjects.length < 3,
      });

      return;
    }


    /* ---------------------------------------------------
       PROJECT FOLDER

       Every image inside the folder belongs to
       ONE project.
    --------------------------------------------------- */

    const config =
      projectConfig[parentFolder];


    /*
     * Ignore folders that aren't configured.
     */

    if (!config) {
      return;
    }


    const existing =
      groupedProjects.get(parentFolder);


    if (existing) {

      existing.images.push(url);

    } else {

      groupedProjects.set(
        parentFolder,
        {
          name:
            config.name,

          category:
            config.category,

          description:
            config.description,

          images: [url],
        },
      );
    }
  });


/* -------------------------------------------------------
   CONVERT FOLDER PROJECTS
------------------------------------------------------- */

const folderProjects: Project[] =
  Array.from(
    groupedProjects.entries(),
  ).map(
    ([folderName, project]) => {

      const images =
        project.images;

      return {
        id:
          `folder-project-${folderName
            .toLowerCase()
            .replace(
              /[^a-z0-9]+/g,
              "-",
            )}`,

        number: "",

        name:
          project.name,

        category:
          project.category,

        description:
          project.description,

        cover_image:
          images[0],

        secondary_image:
          images[1] ?? "",

        gallery:
          images,

        published: true,

        featured: false,
      };
    },
  );


/* -------------------------------------------------------
   FINAL PROJECT LIST
------------------------------------------------------- */

export const PROJECTS: Project[] = [
  ...rootProjects,
  ...folderProjects,
];


/* -------------------------------------------------------
   EXPORT CATEGORIES
------------------------------------------------------- */

export { CATEGORIES };
(function () {
  "use strict";

  /* ------------------------------------- */

  /* animations mixin */

  /* ------------------------------------- */
  var animationsMixin = {
    mounted() {
      /* preloader screen */
      this.animPreloaderScreen(); // initialize animation effects

      window.addEventListener("load", () => this.initAnimation());
    },

    methods: {
      // preloader screen
      animPreloaderScreen() {
        let count = 0;
        const preloader = this.$refs.preloader;

        if (!preloader) {
          return;
        }

        const preloaderContent = preloader.querySelector(".preloader-content");
        const imgs = [...document.images];
        const imgsLength = imgs.length;

        const hidePreloader = () => {
          preloader.setAttribute("style", "--loading-percentage: 100%");
          gsap
            .timeline()
            .set(".hide-in-preloading", {
              autoAlpha: 1,
            })
            .to(preloaderContent, {
              delay: 0.5,
              autoAlpha: 0,
            })
            .to(
              preloader,
              {
                y: "-100%",
                duration: 1,
                ease: "expo.in",
              },
              "-=0.5"
            )
            .set(preloader, {
              autoAlpha: 0,
            });
        };

        const imgLoaded = () => {
          count++;
          this.loadingPercentage = ((100 / imgsLength) * count) << 0;
          preloader.setAttribute(
            "style",
            `--loading-percentage: ${this.loadingPercentage}%`
          );

          if (count === imgsLength) {
            hidePreloader();
          }
        };

        if (imgsLength) {
          // setup preloader indicator
          imgs.forEach((img) => {
            const tImg = new Image();
            tImg.onload = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src = img.src;
          });
        } else {
          hidePreloader();
        }
      },

      // initialize animation effects
      initAnimation() {
        gsap.registerPlugin(ScrollTrigger);
        /* back to top scroll indicator */

        this.animBackTopScrollIndicator();
        /* statistics items */

        this.animStatisticsItems();
        /* section text box */

        this.animSectionTextBox();
        /* about image */

        this.animAboutImage();
        /* skills items */

        this.animSkillsItems();
        /* experience items timeline */

        this.animExperienceItemsTimeline();
        /* testimonials section title */

        this.animTestimonialsSectionTitle();
        /* testimonials items */

        this.animTestimonialsItems();
        /* contact info */

        this.animContactInfo();
        /* contact form */

        this.animContactForm();
      },

      // back to top scroll indicator
      animBackTopScrollIndicator() {
        const backTopBtn = this.$refs.scrollTopBtn;

        if (!backTopBtn) {
          return;
        }

        const showAt = backTopBtn.getAttribute("data-show-at");
        const backTopBtnPath = backTopBtn.querySelector("path");
        const backTopBtnPathLength = backTopBtnPath.getTotalLength();
        gsap.from(backTopBtn, {
          ease: "none",
          duration: 0.3,
          autoAlpha: 0,
          y: 10,
          scrollTrigger: {
            trigger: "#app-inner",
            start: `${showAt}px top`,
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        });
        gsap.set(backTopBtnPath, {
          strokeDasharray: backTopBtnPathLength,
          strokeDashoffset: backTopBtnPathLength,
          scrollTrigger: {
            trigger: "#app-inner",
            start: `${showAt}px top`,
            end: "bottom bottom",
            onUpdate: (self) =>
              (backTopBtnPath.style.strokeDashoffset =
                backTopBtnPathLength - self.progress * backTopBtnPathLength),
          },
        });
      },

      // statistics items
      animStatisticsItems() {
        const statisticsItems = gsap.utils.toArray(
          ".statistics-section .statistics-items li"
        );

        if (!statisticsItems.length) {
          return;
        }

        const statisticsItemsTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".statistics-items",
            start: "top 82%",
            end: "top 50%",
            scrub: 0.3,
          },
        });
        statisticsItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          statisticsItemsTL
            .from(
              el,
              {
                autoAlpha: 0,
              },
              pos
            )
            .from(
              el,
              {
                y: 50,
              },
              "<"
            );
        });
      },

      // section text box
      animSectionTextBox() {
        const textBoxes = gsap.utils.toArray(".text-box-inline");

        if (!textBoxes.length) {
          return;
        }

        textBoxes.forEach((box) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: box,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.3,
              },
            })
            .from(box.querySelector(".subtitle"), {
              autoAlpha: 0,
              top: 50,
            })
            .from(
              box.querySelector("h2"),
              {
                autoAlpha: 0,
                y: 50,
              },
              "-=0.2"
            )
            .from(
              box.querySelectorAll("h2 ~ *"),
              {
                autoAlpha: 0,
                y: 50,
                stagger: 0.2,
              },
              "-=0.2"
            );
        });
      },

      // about image
      animAboutImage() {
        if (!this.$refs.aboutSection) {
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".about-section .about-img",
              start: "top 80%",
              end: "top 50%",
              scrub: 0.3,
            },
          })
          .from(".about-section .about-img", {
            autoAlpha: 0,
            scale: 0.5,
          });
      },

      // skills items
      animSkillsItems() {
        const skillsGroups = gsap.utils.toArray(
          ".skills-section .skills-items ul"
        );

        if (!skillsGroups.length) {
          return;
        }

        skillsGroups.forEach((group) => {
          const skillsItemsTL = gsap.timeline({
            scrollTrigger: {
              trigger: ".skills-section .skills-items",
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3,
            },
          });
          group.querySelectorAll("li").forEach((el, i) => {
            const pos = i === 0 ? "" : "< +=0.2";
            skillsItemsTL
              .from(
                el,
                {
                  autoAlpha: 0,
                },
                pos
              )
              .from(
                el,
                {
                  y: 50,
                },
                "<"
              );
          });
        });
      },

      // experience items timeline
      animExperienceItemsTimeline() {
        const experienceTimepath = this.$refs.experienceTimepath;
        const experienceItems = gsap.utils.toArray(
          ".experience-timeline .timeline-items li"
        );
        let experienceTimepathTL;
        let experienceItemsTL;
        let mainExperienceTL;

        if (experienceTimepath || experienceItems.length) {
          mainExperienceTL = gsap.timeline({
            scrollTrigger: {
              trigger: ".experience-section .experience-timeline",
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3,
            },
          });
        }

        if (experienceTimepath) {
          const experienceTimepathItems = gsap.utils.toArray(
            ".experience-timeline .timepath span"
          );
          experienceTimepathTL = gsap.timeline();
          const docDir = document.documentElement.dir;
          const fromDir = docDir === "rtl" ? "reverse" : "from";
          const reverseDir = docDir === "rtl" ? "from" : "reverse";
          const coords = {
            x: {
              from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              reverse: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            c: {
              from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 75%, 0% 75%, 0% 75%, 0% 75%)",
              reverse:
                "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 75%, 100% 75%, 100% 75%, 100% 75%)",
              to: {
                from: {
                  st1: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 75% 25%, 75% 25%, 0% 25%)",
                  st2: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 75% 75%, 75% 75%, 75% 25%, 0% 25%)",
                  st3: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 75% 75%, 75% 25%, 0% 25%)",
                },
                reverse: {
                  st1: "polygon(100% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 25% 25%, 25% 25%, 100% 25%)",
                  st2: "polygon(100% 0%, 0% 0%, 0% 100%, 0% 100%, 25% 75%, 25% 75%, 25% 25%, 100% 25%)",
                  st3: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 75%, 25% 75%, 25% 25%, 100% 25%)",
                },
              },
            },
          };
          const lineOdd = [
            ...experienceTimepath.querySelectorAll(".line:nth-of-type(4n + 1)"),
          ];
          const lineEven = [
            ...experienceTimepath.querySelectorAll(".line:nth-of-type(4n + 3)"),
          ];
          const semicircleOdd = [
            ...experienceTimepath.querySelectorAll(
              ".semicircle:nth-of-type(4n + 2)"
            ),
          ];
          const semicircleEven = [
            ...experienceTimepath.querySelectorAll(
              ".semicircle:nth-of-type(4n + 4)"
            ),
          ];
          experienceTimepathTL
            .set(experienceTimepathItems, {
              autoAlpha: 1,
            })
            .set(lineOdd, {
              clipPath: coords.x[fromDir],
            })
            .set(lineEven, {
              clipPath: coords.x[reverseDir],
            })
            .set(semicircleOdd, {
              clipPath: coords.c[fromDir],
            })
            .set(semicircleEven, {
              clipPath: coords.c[reverseDir],
            });
          experienceTimepathItems.forEach((el) => {
            if (lineOdd.includes(el) || lineEven.includes(el)) {
              experienceTimepathTL.to(el, {
                clipPath: coords.x.to,
              });
            } else if (semicircleOdd.includes(el)) {
              experienceTimepathTL
                .to(el, {
                  clipPath: coords.c.to[fromDir].st1,
                })
                .to(el, {
                  clipPath: coords.c.to[fromDir].st2,
                })
                .to(el, {
                  clipPath: coords.c.to[fromDir].st3,
                });
            } else if (semicircleEven.includes(el)) {
              experienceTimepathTL
                .to(el, {
                  clipPath: coords.c.to[reverseDir].st1,
                })
                .to(el, {
                  clipPath: coords.c.to[reverseDir].st2,
                })
                .to(el, {
                  clipPath: coords.c.to[reverseDir].st3,
                });
            }
          });
          mainExperienceTL.add(experienceTimepathTL);
        }

        if (experienceItems.length) {
          experienceItemsTL = gsap.timeline();
          experienceItems.forEach((el) => {
            experienceItemsTL
              .from(el, {
                autoAlpha: 0,
              })
              .from(
                el,
                {
                  scale: 0.2,
                },
                "<"
              );
          });
          mainExperienceTL.add(experienceItemsTL, "< +=0.5");
        }
      },

      // testimonials section title
      animTestimonialsSectionTitle() {
        if (!this.$refs.testimonialsSection) {
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".testimonials-section .section-title",
              start: "top 90%",
              end: "top 40%",
              scrub: 0.3,
            },
          })
          .from(".testimonials-section .section-title .subtitle", {
            autoAlpha: 0,
            top: 50,
          })
          .from(
            ".testimonials-section .section-title .title",
            {
              autoAlpha: 0,
              y: 50,
            },
            "< +=0.2"
          );
      },

      // testimonials items
      animTestimonialsItems() {
        if (!this.$refs.testimonialsSection) {
          return;
        }

        const testimonialsItems = gsap.utils.toArray(
          ".testimonials-section .testimonials-item"
        );
        const testimonialsItemsTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".testimonials-section .testimonials-items",
            start: "top 75%",
            end: "top 25%",
            scrub: 0.3,
          },
        });
        testimonialsItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          testimonialsItemsTL
            .from(
              el,
              {
                autoAlpha: 0,
              },
              pos
            )
            .from(
              el,
              {
                scale: 0.2,
              },
              "<"
            );
        });
      },

      // contact info
      animContactInfo() {
        const contactInfoItems = gsap.utils.toArray(
          ".contact-section .contact-info li"
        );

        if (!contactInfoItems.length) {
          return;
        }

        const contactInfoTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".contact-section .contact-info",
            start: "top 80%",
            end: "top 50%",
            scrub: 0.3,
          },
        });
        contactInfoItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          contactInfoTL
            .from(
              el,
              {
                autoAlpha: 0,
              },
              pos
            )
            .from(
              el,
              {
                y: 50,
              },
              "<"
            );
        }); // social icons animation

        contactInfoTL
          .from(".contact-section .contact-text .social li", {
            autoAlpha: 0,
          })
          .from(
            ".contact-section .contact-text .social li",
            {
              y: 50,
              stagger: 0.2,
            },
            "<"
          );
      },

      // contact form
      animContactForm() {
        if (!this.$refs.contactForm) {
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".contact-section .contact-form",
              start: "top 80%",
              end: "top 50%",
              scrub: 0.3,
            },
          })
          .from(".contact-section .contact-form", {
            autoAlpha: 0,
            scale: 0.7,
          });
      },
    },
  };

  /* ------------------------------------- */
  const app = Vue.createApp({
    mixins: [animationsMixin],

    data() {
      return {
        // the date my career started (change to yours)
        careerStartDate: 2022,
        // the date copyright started (change to yours)
        copyrightStartDate: 2025,
        // for the template theme
        appTheme: "light_theme",
        savedTheme: null,
        // flag to toggle the preloader
        isPreloading: true,
        // toast notifications array
        notifications: [],
        // manage loading spinner status
        ajaxLoading: [],
        // for minimizing the header on scrolling down
        startMinimizingHeaderAt: 100,
        isHeaderBig: true,
        // for toggling the header on scrolling down
        lastScrollPosition: 0,
        isHeaderHidden: false,
        // flag to toggle focus style class
        isAnyFocus: false,
        // flag to toggle nav menu
        isNavMenuOpen: false,
        // list of nav links to loop through it
        navLinks: [
          {
            url: "#hero",
            title: {
              en: "Home",
              ar: "الرئيسية",
            },
          },
          {
            url: "#about",
            title: {
              en: "About",
              ar: "من أنا",
            },
          },
          {
            url: "#skills",
            title: {
              en: "Skills",
              ar: "مهاراتي",
            },
          },
          {
            url: "#portfolio",
            title: {
              en: "Portfolio",
              ar: "أعمالي",
            },
          },
          {
            url: "#contact",
            title: {
              en: "Contact",
              ar: "اتصل بي",
            },
          },
        ],
        // flag to toggle between skills types in skills section
        skillsType: "",
        // list of skills items to loop through it
        skillsItems: [
          // {
          //   imgUrl: "assets/images/html5.png",
          //   title: "HTML5",
          // },
          {
            imgUrl: "assets/images/kafka.svg",
            title: "Kafka",
          },
          {
            imgUrl: "assets/images/javascript.png",
            title: "JavaScript",
          },
          {
            imgUrl: "assets/images/typescript.png",
            title: "TypeScript",
          },
          {
            imgUrl: "assets/images/jquery.png",
            title: "jQuery",
          },
          {
            imgUrl: "assets/images/bootstrap.png",
            title: "Bootstrap",
          },
          {
            imgUrl: "assets/images/golang.png",
            title: "Go",
          },
          {
            imgUrl: "assets/images/react.png",
            title: "React",
          },
          {
            imgUrl: "assets/images/python.png",
            title: "Python",
          },
          {
            imgUrl: "assets/images/redis.webp",
            title: "Redis",
          },
          {
            imgUrl: "assets/images/nestjs.png",
            title: "NestJs",
          },
          {
            imgUrl: "assets/images/django.png",
            title: "Django",
          },
          {
            imgUrl: "assets/images/laravel.png",
            title: "Laravel",
          },
          {
            imgUrl: "assets/images/flutter.png",
            title: "Flutter",
          },
        ],
        // list of tools items to loop through it
        toolsItems: [
          {
            imgUrl: "assets/images/ajax.png",
            title: "Ajax",
          },
          {
            imgUrl: "assets/images/gulp.png",
            title: "Gulp",
          },
          {
            imgUrl: "assets/images/webpack.png",
            title: "Webpack",
          },
          {
            imgUrl: "assets/images/git.png",
            title: "Git (Github)",
          },
          {
            imgUrl: "assets/images/npm.png",
            title: "Npm",
          },
          {
            imgUrl: "assets/images/command.png",
            title: "Command Line",
          },
          {
            imgUrl: "assets/images/vs-code.png",
            title: "VS Code",
          },
          {
            imgUrl: "assets/images/trello.png",
            title: "Trello",
          },
          {
            imgUrl: "assets/images/docker.png",
            title: "Docker",
          },
          {
            imgUrl: "assets/images/slack.png",
            title: "Slack",
          },
        ],
        // list of experience items to loop through it
        experienceItems: [
          {
            date: "2022",
            companyName: {
              en: "DeepSafer",
              ar: "شركة ديب سيفر",
            },
            jobTitle: {
              en: "Software Engineer",
              ar: "مهندس برمجيات",
            },
            desc: {
              en: "Developer and head of projects",
              ar: "مطور برمجيات ",
            },
          },
          {
            date: "2024",
            companyName: {
              en: "FreeLancer.",
              ar: "اعمال حره.",
            },
            jobTitle: {
              en: "Full Stack Developer",
              ar: "مطوّر الويب المتكامل",
            },
            desc: {
              en: "Collaborate with creative and development teams on the execution of ideas.",
              ar: "تعاونت مع الفرق الإبداعية في تطوير وتنفيذ أفكار مبتكرة.",
            },
          },
          // {
          //   date: '2025',
          //   companyName: {
          //     en: 'Envato Inc.',
          //     ar: 'شركة انفاتو'
          //   },
          //   jobTitle: {
          //     en: 'UI/UX Developer',
          //     ar: 'مطور UI/UX'
          //   },
          //   desc: {
          //     en: 'Converted Photoshop layouts to web pages using HTML, CSS, and JavaScript.',
          //     ar: 'تم تحويل تخطيطات Photoshop إلى صفحات ويب باستخدام HTML و CSS و JavaScript.'
          //   }
          // },
          {},
          {},
        ],
        // current page of portfolio items
        portfolioItemsPage: 1,
        // portfolio items per page
        itemsPerPage: 7,
        // portfolio items filter by type
        filters: [
          "All",
          "Full Stack",
          "React",
          "Next.js",
          "Django",
          "Nest.js",
          "Golang",
          "Laravel",
        ],
        currentFilter: "All",
        // portfolio archive name
        portfolioArchiveName: "",
        // list of portfolio items to loop through it
        allPortfolioItems: [
          {
            id: 1,
            url: "#",
            imgUrl: "assets/images/healthnews.png",
            // imgUrl: "https://via.placeholder.com/400x400",
            title: {
              en: "Health News Blog",
              ar: "مدونة اخبار الصحة",
            },
            date: {
              en: "April 2024",
              ar: "أبريل 2024",
            },
            desc: {
              en: "A news platform that publishes everything related to health and hospitals, especially in Yemen",
              ar: "منصة اخبارية تنشر كل ما يخص الصحة والمستشفيات بالاخص في دولة اليمن ",
            },
            category: "Wordpress",
            tools: [
              "HTML",
              "CSS",
              "SCSS",
              "JavaScript",
              "Gulp",
              "Bootstrap",
              "PHP",
            ],
            screenshots: {
              img1: {
                url: "assets/images/healthnews.png",
                caption: {
                  en: "main page",
                  ar: "الصفحة الرئيسية",
                },
              },
              img2: {
                url: "assets/images/healthnews.png",
                caption: {
                  en: "caption 4",
                  ar: "تسمية توضيحية 4",
                },
              },
              img3: {
                url: "assets/images/healthnews.png",
                caption: {
                  en: "caption 3",
                  ar: "تسمية توضيحية 3",
                },
              },
            },
          },
          {
            id: 2,
            url: "#",
            imgUrl: "assets/images/lifejourney.ae.png",
            title: {
              en: "Life Journey Travel booking website",
              ar: " موقع Life Journey سفريات وسياحة",
            },
            date: {
              en: "May 2025",
              ar: "مايو 2025",
            },
            desc: {
              en: "it's a website for booking flights, hotels and cars for a travel agancy.",
              ar: "موقع لحجز تداكر السفر والفنادق والسيارات",
            },
            category: "full Stack",
            tools: [
              "Next.js",
              "TailwindCSS",
              "Nest.js",
              "Redis",
              "Postgresql",
              "Nginx",
              "Docker",
              "Minio",
              "NodeJs",
            ],
            screenshots: {
              img1: {
                url: "assets/images/lifejourney.ae.png",
                caption: {
                  en: "Main Page",
                  ar: "الصفحة الرئيسسة",
                },
              },
            },
          },
          {
            id: 3,
            url: "#",
            imgUrl: "assets/images/lifeJourney-backend.png",
            title: {
              en: "The Dashboard for Life Journry website.",
              ar: "لوحة التحكم الخاصة بمشروع Life Journey",
            },
            date: {
              en: "May 2025",
              ar: "مايو 2025",
            },
            desc: {
              en: "the Dashboard for the life journey project.",
              ar: "لوحة التحكم الخاصة بمشروع ",
            },
            category: "Vue",
            tools: [
              "HTML",
              "PugJS",
              "CSS",
              "SCSS",
              "JavaScript",
              "Gulp",
              "Materialize",
              "AJAX",
              "Vue",
              "Firebase",
            ],
            screenshots: {
              img1: {
                url: "https://via.placeholder.com/355x200",
                caption: {
                  en: "caption 5",
                  ar: "تسمية توضيحية 5",
                },
              },
              img2: {
                url: "https://via.placeholder.com/330x460",
                caption: {
                  en: "caption 4",
                  ar: "تسمية توضيحية 4",
                },
              },
              img3: {
                url: "https://via.placeholder.com/300x225",
                caption: {
                  en: "caption 3",
                  ar: "تسمية توضيحية 3",
                },
              },
              img4: {
                url: "https://via.placeholder.com/300x225",
                caption: {
                  en: "caption 2",
                  ar: "تسمية توضيحية 2",
                },
              },
              img5: {
                url: "https://via.placeholder.com/300x225",
                caption: {
                  en: "caption 1",
                  ar: "تسمية توضيحية 1",
                },
              },
            },
          },
        ],
        // ].reverse(),
        // viewed portfolio items
        portfolioItems: [],
        // list of testimonials items to loop through it
        testimonialsItems: [
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh simply provides amazing web development service. Their team is extremely professional and the easiest to meet I have ever worked with. I would recommend Alshaikh to anyone.",
              ar: "محمد يقدم خدمات مذهلة في تطوير الويب، ولديه فريق محترف يجعل التعامل معهم مطمئن للغاية. أوصي بفريقهم للجميع.",
            },
            quoteAuthor: {
              en: "Terrell Grimes",
              ar: "جابر العواني",
            },
            jobTitle: {
              en: "Photographer",
              ar: "مصور فوتوغرافي",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Excellent Team to work with. Always positive to find the most appropriate solution. Alshaikh is one of the professional web development agency that provides awesome services.",
              ar: "فريق ممتاز للعمل معه. إيجابي دائمًا للعثور على الحل الأنسب. هم إحدى شركات تطوير الويب المحترفة التي تقدم خدمات رائعة.",
            },
            quoteAuthor: {
              en: "Lonny Corkery",
              ar: "حسون القلال",
            },
            jobTitle: {
              en: "Project Manager",
              ar: "مدير المشاريع",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh team is very professional, always delivers high quality results, and is always there to help. Look forward to working with Alshaikh in other projects.",
              ar: "محمد مطور محترف للغاية يقدم دائمًا نتائج عالية الجودة ، وهو دائمًا موجود للمساعدة. نتطلع إلى العمل معه في مشاريع أخرى.",
            },
            quoteAuthor: {
              en: "Max Schmidt DDS",
              ar: "مصطفى الخليفي",
            },
            jobTitle: {
              en: "CEO, Designer",
              ar: "أخصائي SEO",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh worked on a handful of projects for us and has always exceeded our expectations. Alshaikh team is dedicated, talented and a delight to work with.",
              ar: "عمل محمد في عدد كبير من المشاريع لأجلنا وكان دائمًا يفوق توقعاتنا. مطور متخصص وموهوب ونسعد دائمًا بالعمل معه.",
            },
            quoteAuthor: {
              en: "Amir Stoltenberg",
              ar: "عباس العنابي",
            },
            jobTitle: {
              en: "Sales Manager",
              ar: "مدير مبيعات",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "I know I can count on your service if I need my project done fast and with the best possible result. I am a regular customer and hope to continue our work!",
              ar: "يمكنني الاعتماد على خدمات محمد دائمًا وخاصة إذا كنت بحاجة إلى إنجاز مشروعي في أقل وقت وبأفضل نتيجة ممكنة. أنا عميل منتظم لديه وآمل أن نواصل عملنا معا دائمًا.",
            },
            quoteAuthor: {
              en: "Kenton Marquardt",
              ar: "سمير النجار",
            },
            jobTitle: {
              en: "Art Director",
              ar: "آرت دايركتور",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Muhammad was a real pleasure to work with and we look forward to working with him again. He’s definitely the kind of developer you can trust with a project from start to finish.",
              ar: "أنا سعيد حقًا بالعمل مع محمد وأتطلع إلى العمل معه مرة أخرى قريبا. هو بالتأكيد من المطورين الذي يمكنك الوثوق بهم للعمل على مشروعك من البداية إلى النهاية.",
            },
            quoteAuthor: {
              en: "Reyna Hammes",
              ar: "أمير داوود",
            },
            jobTitle: {
              en: "Motion Graphic Animator",
              ar: "مصمم موشن جرافيك",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Muhammad was a real pleasure to work with and we look forward to working with him again. He’s definitely the kind of developer you can trust with a project from start to finish.",
              ar: "أنا سعيد حقًا بالعمل مع محمد وأتطلع إلى العمل معه مرة أخرى قريبا. هو بالتأكيد من المطورين الذي يمكنك الوثوق بهم للعمل على مشروعك من البداية إلى النهاية.",
            },
            quoteAuthor: {
              en: "Jovan Parisian",
              ar: "منصور السقاط",
            },
            jobTitle: {
              en: "Motion Graphic Animator",
              ar: "مصمم موشن جرافيك",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "I know I can count on your service if I need my project done fast and with the best possible result. I am a regular customer and hope to continue our work!",
              ar: "يمكنني الاعتماد على خدمات محمد دائمًا وخاصة إذا كنت بحاجة إلى إنجاز مشروعي في أقل وقت وبأفضل نتيجة ممكنة. أنا عميل منتظم لديه وآمل أن نواصل عملنا معا دائمًا.",
            },
            quoteAuthor: {
              en: "Pasquale Deckow",
              ar: "عطا بن عاشور",
            },
            jobTitle: {
              en: "Art Director",
              ar: "آرت دايركتور",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh worked on a handful of projects for us and has always exceeded our expectations. Alshaikh team is dedicated, talented and a delight to work with.",
              ar: "عمل محمد في عدد كبير من المشاريع لأجلنا وكان دائمًا يفوق توقعاتنا. مطور متخصص وموهوب ونسعد دائمًا بالعمل معه.",
            },
            quoteAuthor: {
              en: "Rosa Ferry",
              ar: "نافع حاتم",
            },
            jobTitle: {
              en: "Sales Manager",
              ar: "مدير مبيعات",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh team is very professional, always delivers high quality results, and is always there to help. Look forward to working with Alshaikh in other projects.",
              ar: "محمد مطور محترف للغاية يقدم دائمًا نتائج عالية الجودة ، وهو دائمًا موجود للمساعدة. نتطلع إلى العمل معه في مشاريع أخرى.",
            },
            quoteAuthor: {
              en: "Keshaun Robel",
              ar: "صدقي الطويل",
            },
            jobTitle: {
              en: "CEO, Designer",
              ar: "أخصائي SEO",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Excellent Team to work with. Always positive to find the most appropriate solution. Alshaikh is one of the professional web development agency that provides awesome services.",
              ar: "فريق ممتاز للعمل معه. إيجابي دائمًا للعثور على الحل الأنسب. هم إحدى شركات تطوير الويب المحترفة التي تقدم خدمات رائعة.",
            },
            quoteAuthor: {
              en: "Casper Paucek",
              ar: "حسان ادريس",
            },
            jobTitle: {
              en: "Project Manager",
              ar: "مدير المشاريع",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh simply provides amazing web development service. Their team is extremely professional and the easiest to meet I have ever worked with. I would recommend Alshaikh to anyone.",
              ar: "محمد يقدم خدمات مذهلة في تطوير الويب، ولديه فريق محترف يجعل التعامل معهم مطمئن للغاية. أوصي بفريقهم للجميع.",
            },
            quoteAuthor: {
              en: "Archibald Fadel",
              ar: "مجد الكافي",
            },
            jobTitle: {
              en: "Photographer",
              ar: "مصور فوتوغرافي",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh simply provides amazing web development service. Their team is extremely professional and the easiest to meet I have ever worked with. I would recommend Alshaikh to anyone.",
              ar: "محمد يقدم خدمات مذهلة في تطوير الويب، ولديه فريق محترف يجعل التعامل معهم مطمئن للغاية. أوصي بفريقهم للجميع.",
            },
            quoteAuthor: {
              en: "Tabitha Denesik",
              ar: "آسر بنسلامة",
            },
            jobTitle: {
              en: "Photographer",
              ar: "مصور فوتوغرافي",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Excellent Team to work with. Always positive to find the most appropriate solution. Alshaikh is one of the professional web development agency that provides awesome services.",
              ar: "فريق ممتاز للعمل معه. إيجابي دائمًا للعثور على الحل الأنسب. هم إحدى شركات تطوير الويب المحترفة التي تقدم خدمات رائعة.",
            },
            quoteAuthor: {
              en: "Javon Bogan",
              ar: "صهيب الشريف",
            },
            jobTitle: {
              en: "Project Manager",
              ar: "مدير المشاريع",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh team is very professional, always delivers high quality results, and is always there to help. Look forward to working with Alshaikh in other projects.",
              ar: "محمد مطور محترف للغاية يقدم دائمًا نتائج عالية الجودة ، وهو دائمًا موجود للمساعدة. نتطلع إلى العمل معه في مشاريع أخرى.",
            },
            quoteAuthor: {
              en: "Duncan Kemmer",
              ar: "سيد كرم",
            },
            jobTitle: {
              en: "CEO, Designer",
              ar: "أخصائي SEO",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Alshaikh worked on a handful of projects for us and has always exceeded our expectations. Alshaikh team is dedicated, talented and a delight to work with.",
              ar: "عمل محمد في عدد كبير من المشاريع لأجلنا وكان دائمًا يفوق توقعاتنا. مطور متخصص وموهوب ونسعد دائمًا بالعمل معه.",
            },
            quoteAuthor: {
              en: "Coy Johns",
              ar: "هيثم الشريف",
            },
            jobTitle: {
              en: "Sales Manager",
              ar: "مدير مبيعات",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "I know I can count on your service if I need my project done fast and with the best possible result. I am a regular customer and hope to continue our work!",
              ar: "يمكنني الاعتماد على خدمات محمد دائمًا وخاصة إذا كنت بحاجة إلى إنجاز مشروعي في أقل وقت وبأفضل نتيجة ممكنة. أنا عميل منتظم لديه وآمل أن نواصل عملنا معا دائمًا.",
            },
            quoteAuthor: {
              en: "Murphy Roberts",
              ar: "إسلام مصطفى",
            },
            jobTitle: {
              en: "Art Director",
              ar: "آرت دايركتور",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "Muhammad was a real pleasure to work with and we look forward to working with him again. He’s definitely the kind of developer you can trust with a project from start to finish.",
              ar: "أنا سعيد حقًا بالعمل مع محمد وأتطلع إلى العمل معه مرة أخرى قريبا. هو بالتأكيد من المطورين الذي يمكنك الوثوق بهم للعمل على مشروعك من البداية إلى النهاية.",
            },
            quoteAuthor: {
              en: "Dimitri Lockman",
              ar: "وسيم السقا",
            },
            jobTitle: {
              en: "Motion Graphic Animator",
              ar: "مصمم موشن جرافيك",
            },
          },
        ],
      };
    },

    created() {
      // get a theme to use
      this.getAppTheme();
    },

    mounted() {
      if (window.innerWidth >= 992) {
        // initialize circle cursor
        this.initCircleCursor(); // apply pan effect hero image

        this.heroImgPanEffect(); // initialize VanillaTilt library in portfolio section

        this.initializeTilt();
      } // nav menu tab trap

      this.navMenuTabTrap(); // scrolling options

      this.scrollingOptions();
      document.addEventListener("scroll", () => this.scrollingOptions()); // initialize popper.js plugin

      document.querySelectorAll(".has-ultimate-tooltip").forEach((el) => {
        Popper.createPopper(el, el.querySelector(".ultimate-tooltip"), {
          placement: "top",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 30],
              },
            },
          ],
        });
      }); // get portfolio items

      this.getPortfolioItems(); // init glightbox plugin

      new GLightbox({
        autoplayVideos: false,
      }); // initialize the first displayed type of skills

      this.initSkillsFirstType();
    },

    methods: {
      // initialize circle cursor
      initCircleCursor() {
        const app = this.$refs.appRef;
        const outer = this.$refs.circleCursorOuter;
        const inner = this.$refs.circleCursorInner; // return if disabled

        if (!outer || !inner) {
          return;
        }

        app.addEventListener("mousemove", (e) => {
          // make the circles follow the cursor
          outer.setAttribute(
            "style",
            `visibility: visible; top: ${e.clientY}px; left: ${e.clientX}px;`
          );
          inner.setAttribute(
            "style",
            `visibility: visible; top: ${e.clientY}px; left: ${e.clientX}px;`
          ); // add link hover style

          e.target.closest("a") ||
          e.target.closest("button") ||
          e.target.closest(".link-hover")
            ? inner.classList.add("cursor-link-hover")
            : inner.classList.remove("cursor-link-hover");
        });
        app.addEventListener("click", () => {
          // add pulse effect on click
          inner.classList.add("cursor-click-effect");
          setTimeout(() => inner.classList.remove("cursor-click-effect"), 200);
        });
      },

      // get a theme to use
      getAppTheme() {
        // get the saved theme from the localStorage
        const storageSavedTheme = localStorage.getItem("hamzahSavedTheme"); // Check to see if there a saved theme

        if (storageSavedTheme) {
          this.savedTheme = storageSavedTheme;
        } else {
          // So, try to get the browser default theme or make your own default
          // Check to see if Media-Queries are supported
          if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              this.savedTheme = "dark_theme";
            } else {
              this.savedTheme = "light_theme";
            }
          } else {
            // Default (when Media-Queries are not supported)
            this.savedTheme = this.appTheme;
          }
        } // save the new theme in the localStorage

        localStorage.setItem("hamzahSavedTheme", this.savedTheme);
      },

      // detect the theme changes
      changeAppTheme() {
        this.savedTheme === "light_theme"
          ? (this.savedTheme = "dark_theme")
          : (this.savedTheme = "light_theme"); // save the new theme in the localStorage

        localStorage.setItem("hamzahSavedTheme", this.savedTheme);
      },

      // toggle nav menu
      toggleNavMenu() {
        this.isNavMenuOpen = !this.isNavMenuOpen;
        this.isNavMenuOpen ? this.openNavMenu() : this.closeNavMenu();
      },

      // open nav menu
      openNavMenu() {
        const bodyEl = document.getElementsByTagName("body")[0];
        this.isNavMenuOpen = true;
        bodyEl.setAttribute("style", "overflow-y: hidden;"); // set focus on nav menu

        this.$refs.headerNav.querySelector(".desktop-menu-content").focus();
      },

      // close nav menu
      closeNavMenu() {
        const bodyEl = document.getElementsByTagName("body")[0];
        this.isNavMenuOpen = false;
        bodyEl.removeAttribute("style"); // set focus on nav menu toggle button

        this.$refs.navMenuToggleBtn.focus();
      },

      // nav menu tab trap
      navMenuTabTrap() {
        const nav = this.$refs.headerNav;
        const focusableElementsString =
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
        let firstTabStop;
        let lastTabStop;
        let isFirstTabStop;
        let isLastTabStop;
        document.addEventListener("keyup", (e) => {
          if (nav.classList.contains("menu-open")) {
            // get first & last focusable elements in the side menu for the tab trap
            const visibleFocusableEls = [
              ...nav.querySelectorAll(focusableElementsString),
            ].filter(
              (el) =>
                window.getComputedStyle(el).getPropertyValue("visibility") !==
                "hidden"
            );
            firstTabStop = visibleFocusableEls[0];
            lastTabStop = visibleFocusableEls[visibleFocusableEls.length - 1];

            if (e.code === "Tab") {
              if (e.shiftKey) {
                /* shift + tab */
                // if this is the first item, move to the last item
                isFirstTabStop && lastTabStop.focus();
              } else {
                /* tab */
                // if this is the last item, go back to the first item
                isLastTabStop && firstTabStop.focus();
              } // close nav menu on Escape button press
            } else if (e.code === "Escape") {
              this.toggleNavMenu();
            } // get current active element

            const activeEl = document.activeElement; // check if last item or not

            isLastTabStop = activeEl === lastTabStop ? true : false; // check if first item or not

            isFirstTabStop = activeEl === firstTabStop ? true : false;
          }
        });
      },

      // apply pan effect hero image
      heroImgPanEffect() {
        const parent = this.$refs.heroSection; // return if disabled

        if (!parent || !parent.getAttribute("data-paneffect")) {
          return;
        }

        const layer1 = parent.querySelectorAll(".layer")[0];
        const layer2 = parent.querySelectorAll(".layer")[1];
        parent.addEventListener("mousemove", (e) => {
          const x =
            ((e.x - parent.getBoundingClientRect().x) / parent.offsetWidth) *
            100;
          const y =
            ((e.y - parent.getBoundingClientRect().y) / parent.offsetHeight) *
            100;
          parent.classList.add("parallax-animation");
          layer1.setAttribute("style", `transform-origin: ${x}vw ${y}vh;`);
          layer2.setAttribute("style", `transform-origin: ${x}vw ${y}vh;`);
        });
      },

      // scrolling options
      scrollingOptions() {
        const scrollPosition = window.pageYOffset; // check for current scroll position to minimize the header

        this.isHeaderBig =
          scrollPosition >= this.startMinimizingHeaderAt ? false : true; // check for current scroll position to toggle the header

        this.isHeaderHidden =
          scrollPosition > 100 && scrollPosition > this.lastScrollPosition
            ? true
            : false;
        this.lastScrollPosition = scrollPosition;
      },

      // scroll to top
      scrollToTop() {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      },

      // initialize the first displayed type of skills
      initSkillsFirstType() {
        const skillsSwitchBtn = this.$refs.skillsSwitchBtn; // return if disabled

        if (!skillsSwitchBtn) {
          return;
        }

        this.skillsType = skillsSwitchBtn.querySelector("input").value;
      },

      // initialize VanillaTilt library in portfolio section
      initializeTilt() {
        const portfolioItems = this.$refs.portfolioItems; // return if disabled

        if (!portfolioItems) {
          return;
        }

        VanillaTilt.init(portfolioItems.querySelectorAll(".portfolio-item"), {
          max: 8,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
        });
      },

      // get portfolio items
      getPortfolioItems() {
        const itemsArr = this.allPortfolioItems
          .filter((item) => {
            const urlParams = new URLSearchParams(window.location.search);
            const tax = urlParams.get("tax");

            if (tax) {
              if (tax === "cat") {
                const cat = urlParams.get("cat");
                this.portfolioArchiveName = cat;
                return item.category === cat;
              } else if (tax === "tools") {
                const tool = urlParams.get("tools");
                this.portfolioArchiveName = tool;
                return item.tools.includes(tool);
              }
            } else {
              return (
                this.currentFilter === "All" ||
                item.category === this.currentFilter
              );
            }
          })
          .slice(
            this.filteredPortfolioItems.length,
            this.portfolioItemsPage * this.itemsPerPage
          ); // check if have works or not

        if (itemsArr.length) {
          this.portfolioItems.push(...itemsArr);
          this.$nextTick(() => {
            // reinitialize VanillaTilt for new items
            this.portfolioItemsPage > 1 && this.initializeTilt(); // Forces the ScrollTrigger instance to re-calculate its start and end values

            setTimeout(() => ScrollTrigger.refresh(), 500);
          });
          this.portfolioItemsPage++;
        } else {
          // show message "No works" to the user
          this.setNotify({
            className: "danger",
            msg: this.$refs.portfolioItems.getAttribute("data-no-works-msg"),
            time: 3000,
          });
        }
      },

      // filter portfolio items
      filterPortfolioItems(filter) {
        this.currentFilter = filter;
        this.portfolioItemsPage = 1;

        if (this.filteredPortfolioItems.length) {
          this.$nextTick(() => {
            // reinitialize VanillaTilt for new items
            this.portfolioItemsPage > 1 && this.initializeTilt(); // Forces the ScrollTrigger instance to re-calculate its start and end values

            setTimeout(() => ScrollTrigger.refresh(), 500);
          });
        } else {
          // get new portfolio items
          this.getPortfolioItems();
        }
      },

      // contact form validation
      contactFormValidation() {
        // contact form
        const contactForm = this.$refs.contactForm; // form controls

        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const phone = contactForm.querySelector('input[name="phone"]');
        const message = contactForm.querySelector("textarea"); // form validation status

        let errors = {
          name: {
            required: true,
            minLength: true,
          },
          email: {
            required: true,
            invalid: true,
          },
          phone: {
            invalid: true,
          },
          message: {
            required: true,
          },
        };
        /* --------------- */

        /* name validation */

        /* --------------- */
        // required validation

        if (name.value === "") {
          errors.name.required = true;
          this.setNotify({
            id: "nameRequired",
            className: "danger",
            msg: name
              .closest(".control")
              .querySelector(".errors-msgs .required").value,
          });
        } else {
          errors.name.required = false;
          this.dismissNotify("nameRequired");
        } // minlength validation

        if (
          name.value.length > 0 &&
          name.value.length < name.getAttribute("minlength")
        ) {
          errors.name.minLength = true;
          this.setNotify({
            id: "nameMinLength",
            className: "danger",
            msg: name
              .closest(".control")
              .querySelector(".errors-msgs .minLength").value,
          });
        } else {
          errors.name.minLength = false;
          this.dismissNotify("nameMinLength");
        } // toggle invalid errors & style classes

        if (Object.keys(errors.name).some((err) => errors.name[err] === true)) {
          name.classList.remove("valid");
          name.classList.add("invalid");
        } else {
          name.classList.remove("invalid");
          name.classList.add("valid");
        }
        /* ---------------- */

        /* email validation */

        /* ---------------- */
        // required validation

        if (email.value === "") {
          errors.email.required = true;
          this.setNotify({
            id: "emailRequired",
            className: "danger",
            msg: email
              .closest(".control")
              .querySelector(".errors-msgs .required").value,
          });
        } else {
          errors.email.required = false;
          this.dismissNotify("emailRequired");
        } // email validation

        if (
          email.value.length > 0 &&
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email.value
          )
        ) {
          errors.email.invalid = true;
          this.setNotify({
            id: "emailInvalid",
            className: "danger",
            msg: email
              .closest(".control")
              .querySelector(".errors-msgs .invalid").value,
          });
        } else {
          errors.email.invalid = false;
          this.dismissNotify("emailInvalid");
        } // toggle invalid errors & style classes

        if (
          Object.keys(errors.email).some((err) => errors.email[err] === true)
        ) {
          email.classList.remove("valid");
          email.classList.add("invalid");
        } else {
          email.classList.remove("invalid");
          email.classList.add("valid");
        }
        /* ---------------- */

        /* phone validation */

        /* ---------------- */
        // phone validation

        if (
          phone.value.length > 0 &&
          !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            phone.value
          )
        ) {
          errors.phone.invalid = true;
          this.setNotify({
            id: "phoneInvalid",
            className: "danger",
            msg: phone
              .closest(".control")
              .querySelector(".errors-msgs .invalid").value,
          });
        } else {
          errors.phone.invalid = false;
          this.dismissNotify("phoneInvalid");
        } // toggle invalid errors & style classes

        if (
          Object.keys(errors.phone).some((err) => errors.phone[err] === true)
        ) {
          phone.classList.remove("valid");
          phone.classList.add("invalid");
        } else {
          phone.classList.remove("invalid");
          phone.classList.add("valid");
        }
        /* ------------------ */

        /* message validation */

        /* ------------------ */
        // required validation

        if (message.value === "") {
          errors.message.required = true;
          this.setNotify({
            id: "messageRequired",
            className: "danger",
            msg: message
              .closest(".control")
              .querySelector(".errors-msgs .required").value,
          });
        } else {
          errors.message.required = false;
          this.dismissNotify("messageRequired");
        } // toggle invalid errors & style classes

        if (
          Object.keys(errors.message).some(
            (err) => errors.message[err] === true
          )
        ) {
          message.classList.remove("valid");
          message.classList.add("invalid");
        } else {
          message.classList.remove("invalid");
          message.classList.add("valid");
        } // send the message if the form is valid

        !Object.values(errors).some((control) =>
          Object.values(control).some(Boolean)
        ) && this.sendContactFormMessage(contactForm);
      },

      // send message from contact form
      sendContactFormMessage(form) {
        const url = form.getAttribute("action");
        const formData = new FormData(form); // start loading spinner

        this.startLoading(); // send post request

        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.text())
          .then((data) => {
            if (data === "success") {
              // show success message
              this.setNotify({
                className: "success",
                msg: form.getAttribute("data-success-msg"),
                time: 5000,
              }); // reset all form inputs

              form.reset(); // remove inputs valid classes

              form
                .querySelectorAll(".valid")
                .forEach((el) => el.classList.remove("valid"));
            } else if (data === "error") {
              // show error message
              this.setNotify({
                className: "danger",
                msg: form.getAttribute("data-err-msg"),
                time: 5000,
              });
            } // end loading spinner

            this.endLoading();
            console.log(data);
          })
          .catch((err) => console.log(err));
      },

      // show messages by toast notifications
      setNotify({ id, className, msg, time }) {
        const notify = {
          id: id || `${Date.now()}${this.notifications.length}`,
          className,
          msg,
          time,
        };

        if (id) {
          !this.notifications.some((e) => e.id === id) &&
            this.notifications.push(notify);
        } else {
          this.notifications.push(notify);
        } // remove this notification from the array after (n) seconds

        time && setTimeout(() => this.dismissNotify(notify.id), time);
      },

      // dismiss the notifications
      dismissNotify(id) {
        const index = this.notifications.findIndex(
          (notify) => notify.id === id
        );
        index > -1 && this.notifications.splice(index, 1);
      },

      // add ajax loading spinner
      startLoading() {
        this.ajaxLoading.push(true);
      },

      // remove ajax loading spinner
      endLoading() {
        this.ajaxLoading.pop();
      },
    },
    computed: {
      // flag to toggle ajax loading spinner
      isAjaxLoading() {
        return this.ajaxLoading.some((state) => state === true);
      },

      // get the total years of experience
      experienceYears() {
        return (
          new Date(
            new Date() - new Date(String(this.careerStartDate))
          ).getFullYear() - 1970
        );
      },

      // split experience items into chunks of 3 items
      experienceChunks() {
        return [...Array(Math.floor((this.experienceItems.length - 1) / 3))];
      },

      // filtered portfolio items
      filteredPortfolioItems() {
        const urlParams = new URLSearchParams(window.location.search);
        const tax = urlParams.get("tax");

        if (tax) {
          return this.portfolioItems;
        } else {
          return this.portfolioItems.filter(
            (item) =>
              this.currentFilter === "All" ||
              item.category === this.currentFilter
          );
        }
      },

      // get single portfolio item
      getSinglePortfolioItem() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        return this.allPortfolioItems.find((item) => item.id == id);
      },

      // get the total years of copyright
      copyrightDate() {
        const yearsDuration =
          new Date(
            new Date() - new Date(String(this.copyrightStartDate))
          ).getFullYear() - 1970;
        return yearsDuration === 0
          ? this.copyrightStartDate
          : `${this.copyrightStartDate} - ${
              this.copyrightStartDate + yearsDuration
            }`;
      },
    },
    directives: {
      // clone directive
      clone: {
        mounted(el) {
          el.parentNode.insertBefore(el.cloneNode(true), el.nextSibling);
        },
      },
      // add stagger delay to children elements
      staggerdelay: {
        mounted(el, binding) {
          [...el.children].forEach((child, i) => {
            child.setAttribute(
              "style",
              `animation-delay: ${(i + 1) * (binding.value || 100)}ms`
            );
          });
        },
      },
      // tooltip directive
      tooltip: {
        mounted(el, binding) {
          el.classList.add("has-tooltip");
          el.insertAdjacentHTML(
            "beforeend",
            `<div class="custom-tooltip custom-tooltip-${binding.value.dir}">${binding.value.text}</div>`
          );
        },
      },
    },
  });
  app.mount("#app");
})();

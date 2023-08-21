import React from "react";
import hero from "./img/hero.png";
import cooking from "./img/cooking.png";
import working from "./img/working.png";
import searching from "./img/searching.png";
import "./css/home.css";

function Home() {
    return (
      <>
      <div className="hero">
          <div className="inner-hero">
              <div className="catch">
                  <h2>Are you seeking a healthier life but find the process of meal planning overwhelming?</h2>
                  <h6>Let KitchenBuddy be your savior. Our state-of-the-ar AI takes your preferences and health goals into account, delivering personalised, delicious meal plans straight to your device. No more guesswork, just effortless, healthy eating.</h6>
              </div>
              <div className="cta">
                  <button className="primary">Get Started</button>
              </div>
          </div>
          <img src={hero} className="img" alt="hero" />
      </div>
      <div className="how-it-works">

          <div className="hiw-l">
              <div className="hiw-l-inner">
                  <div className="hiw-l-i-inner">
                      <p>How it works</p>
                      <h3>KitchenBuddy: Redefining Home Cooking with AI Technology</h3>
                  </div>
              </div>
              <img src={cooking} className="cooking-img" alt="cooking" />
          </div>


          <div className="hiw-r">
              <div className="hiw-r-inner">
                  <div className="hiwri1-n">
                      <svg width="48" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 4H36.5C40.9183 4 44.5 7.58172 44.5 12V36C44.5 40.4183 40.9183 44 36.5 44H12.5C8.08172 44 4.5 40.4183 4.5 36V12C4.5 7.58172 8.08172 4 12.5 4ZM39.9083 39.4083C40.8122 38.5043 41.32 37.2783 41.32 36V12C41.32 10.7217 40.8122 9.49567 39.9083 8.59175C39.0043 7.68782 37.7783 7.18 36.5 7.18H12.5C9.83799 7.18 7.68 9.33799 7.68 12V36C7.68 37.2783 8.18782 38.5043 9.09175 39.4083C9.99567 40.3122 11.2217 40.82 12.5 40.82H36.5C37.7783 40.82 39.0043 40.3122 39.9083 39.4083Z" fill="black"/>
                          <path d="M32.5 22.5H26V16C26 15.1716 25.3284 14.5 24.5 14.5C23.6716 14.5 23 15.1716 23 16V22.5H16.5C15.6716 22.5 15 23.1716 15 24C15 24.8284 15.6716 25.5 16.5 25.5H23V32C23 32.8284 23.6716 33.5 24.5 33.5C25.3284 33.5 26 32.8284 26 32V25.5H32.5C33.3284 25.5 34 24.8284 34 24C34 23.1716 33.3284 22.5 32.5 22.5Z" fill="black"/>
                      </svg>
                      <div className="line">
                      </div>
                  </div>
                  <div className="hiwsub">
                      <h6>Sign Up</h6>
                      <p>Start your culinary revolution by creating a KitchenBuddy account. It's the first step to a healthier, hassle-free dining experience.</p>
                  </div>

              <div>

              </div>
              </div>


              <div className="hiw-r-inner">
              <div className="hiwri1-n">
              <svg width="48" height="48" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 35V48C1.5 49.1046 2.39543 50 3.5 50H47.5C48.6046 50 49.5 49.1046 49.5 48V35" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M25.5 2V38M25.5 38L13.5 26M25.5 38L37.5 26" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                      <div className="line">
                      </div>
                  </div>
                  <div className="hiwsub">
                      <h6>Receive Meal Plans</h6>
                      <p>With your preferences in mind, KitchenBuddy's AI generates your personalized meal plan. It's like receiving a weekly menu from your favorite restaurant.</p>
                  </div>
              </div>


              <div className="hiw-r-inner">
              <div className="hiwri1-n">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.7399 15.7004H3.26009C2.61604 15.7004 2.13993 16.3004 2.28623 16.9276L9.81973 49.2257C9.92531 49.6784 10.3288 49.9986 10.7936 49.9986H41.2064C41.6712 49.9986 42.0747 49.6783 42.1803 49.2257L49.7138 16.9276C49.8601 16.3004 49.384 15.7004 48.7399 15.7004Z" stroke="black" stroke-width="3"/>
              <path d="M10 15.7185L20.6667 1.99927" stroke="black" stroke-width="3" stroke-linecap="round"/>
              <path d="M42 15.7185L31.3333 1.99927" stroke="black" stroke-width="3" stroke-linecap="round"/>
              </svg>
                      <div className="line">
                      </div>
                  </div>
                  <div className="hiwsub">
                      <h6>Go Grocery Shopping</h6>
                      <p>With your meal plan in hand, you'll know exactly what to buy. Say goodbye to food waste and hello to efficient shopping.</p>
                  </div>
              </div>


              <div className="hiw-r-inner">
              <div className="hiwri1-n">
              <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 0.999268C6.8736 0.999268 1.5 6.96376 1.5 14.3225C1.5 20.2628 3.6 34.3612 24.2712 48.613C24.6415 48.8656 25.0666 48.9993 25.5 48.9993C25.9334 48.9993 26.3585 48.8656 26.7288 48.613C47.4 34.3612 49.5 20.2628 49.5 14.3225C49.5 6.96376 44.1264 0.999268 37.5 0.999268C30.8736 0.999268 25.5 9.07395 25.5 9.07395C25.5 9.07395 20.1264 0.999268 13.5 0.999268Z" fill="#EB5757" stroke="#EB5757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                  </div>
                  <div className="hiwsub">
                      <h6>Enjoy!</h6>
                      <p>Start cooking and savoring your healthy, delicious meals. Watch as your kitchen transforms into a hub of nutrition and taste. Enjoy your culinary journey with KitchenBuddy.</p>
                  </div>
              </div>
          </div>
      </div>
      <div className="our-mission">
          <div className="our-mission-inner">
              <div className="omi-1">
                  <h2>Our Mission: Revolutionising Meal Planner</h2>
                  <h6>Harnessing AI to foster healthier lifestyles and sustainable choices.</h6>
              </div>
              <button className="primary">Our Mission</button>
          </div>
          <img src={working} className="img"  alt=""/>
      </div>
      <div className="faqsection">
              <div className="faqsection-i">
                  <div className="faqs-i-t">
                  <h2>Frequently Asked Questions</h2>
                  <h6>Have a question? We've got answers. If you can't find what you're looking for, feel free to contact us.</h6>
                  <button className="primary">Contact Us</button>
                  </div>
                  <img src={searching} className="img-s"  alt=""/>  
                  </div>
              <div className="faqsection-ii">
                  <div className="faqs-q">
                      <h6>Can KitchenBuddy cater to my specific dietary needs?</h6>
                      <p>Absolutely! KitchenBuddy's AI can adapt to a wide range of dietary needs including vegan, gluten-free, halal, kosher, and more. Your preferences guide our meal planning.</p>
                  </div>
                  <div className="faqs-q">
                      <h6>How diverse are the meals in the meal plan?</h6>
                      <p>KitchenBuddy ensures a wide variety of meals. Like an adventurous foodie, our AI loves to introduce you to new recipes.</p>                    
                  </div>
                  
                  <div className="faqs-q">
                      <h6>What if I don't have time to cook some days?</h6>
                      <p>No worries, KitchenBuddy can adapt. The AI takes your schedule into account when planning meals, ensuring a perfect fit for your lifestyle.</p>
                  </div>
                  <div className="faqs-q">
                      <h6>What if I don't like a meal?</h6>
                      <p>If a meal doesn't hit the spot, your feedback helps the AI improve. It's like training a personal chef who's dedicated to pleasing your palate.</p>                    
                  </div>
                  <div className="faqs-q">
                      <h6>How do I get started with KitchenBuddy?</h6>
                      <p>Simply sign up, fill in your dietary needs and preferences, and let KitchenBuddy do the rest. Start your culinary adventure today.</p>                    
                  </div>
              </div>
      </div>
      </>
    );
}

export default Home;
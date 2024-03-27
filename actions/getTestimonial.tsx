import prismadb from "@/lib/prisma";
import React from "react";

export async function getPendingTestimonial() {
  try {
    const response = await fetch("/api/testimonial");
    // console.log("response", response);
    const testimonials = await response.json();
    // console.log("testimonial action", testimonials);
    const pendingTestimonial = testimonials.filter(
      (testimonial) =>
        testimonial.isPending === true &&
        testimonial.isApproved === false &&
        testimonial.show === false
    );
    // console.log("pending testimonial action", pendingTestimonial);
    return pendingTestimonial;
  } catch (error) {
    console.log(error);
  }
}

export async function getshowingTestimonial() {
  try {
    const response = await fetch("/api/testimonial");
    // console.log("response", response);
    const testimonials = await response.json();
    // console.log("testimonial action", testimonials);
    const showingTestimonial = testimonials.filter(
      (testimonial) =>
        testimonial.isPending === false &&
        testimonial.isApproved === true &&
        testimonial.show === true
    );
    // console.log("showing testimonial action", showingTestimonial);
    return showingTestimonial;
  } catch (error) {
    console.log(error);
  }
}

export async function gethiddenTestimonial() {
  try {
    const response = await fetch("/api/testimonial");
    //   console.log("response", response);
    const testimonials = await response.json();
    //   console.log("testimonial action", testimonials);
    const hiddenTestimonial = testimonials.filter(
      (testimonial) =>
        testimonial.isPending === false &&
        testimonial.isApproved === true &&
        testimonial.show === false
    );
    // console.log("hidden testimonial action", hiddenTestimonial);
    return hiddenTestimonial;
  } catch (error) {
    console.log(error);
  }
}

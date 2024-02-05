import React from "react";
import Link from "next/link";

async function Footer() {
  return (
    <header className="site-footer">
      <div className="logo-wrapper">
        <Link href="" className="logo">
          What2Wearther
        </Link>
        <p className="disclaimer">
          Copyright © 2099 What2Wearther Inc. All Rights Reserved.
        </p>
      </div>

      <div className="link-wrapper">
        <div className="col"></div>
        <div className="col">
          <h2>Legal</h2>
          <nav>
            <ol>
              <li>
                <Link href="">Terms of Use</Link>
              </li>
              <li>
                <Link href="">Privacy Policy</Link>
              </li>
              <li>
                <Link href="">Contact</Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Footer;

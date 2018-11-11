import javax.imageio.ImageIO;
import java.awt.image.BufferedImage; 
import java.awt.Color;
import java.io.File;
import java.io.IOException;

public class PlateTester
{
  
  public static void PlateTester() throws IOException
  {
	  String ans = "";
	  int count = 0;
      BufferedImage test = ImageIO.read(new File("salad.jpg"));	
      for(int i = 0; i < test.getHeight(); i++)
      {
    	  for(int j = 0; j < test.getWidth(); j++)
    	  {
    		  Color p = new Color(test.getRGB(j, i));
    		  if(p.getGreen() >= (p.getBlue() + (p.getRed()/1.5)))
    		  {
    			  count++;
    		  }
    	  }
      }
      double ratio = (double) count / (test.getHeight() * test.getWidth());
      if(ratio >= .45)
      {
    	  ans = "Food is healthy!!!";
      }
      else
      {
    	  ans = "You should choose another dish";
      }
      System.out.println(ans);
  }
  
  /** Main method for testing.  Every class can have a main
    * method in Java */
  public static void main(String[] args) throws IOException
  {
   PlateTester();
  }
}